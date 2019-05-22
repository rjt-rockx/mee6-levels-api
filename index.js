const got = require("got");

/**
 * A wrapper around the Mee6 levels API to fetch the leaderboard, role rewards and user xp.
 */
class Mee6LevelsApi {

	/**
	 * Create a new Mee6LevelsApi instance.
	 */
	constructor() {
		this.baseUrl = "https://mee6.xyz/api/plugins/levels/leaderboard/";
		this.options = { baseUrl: this.baseUrl, json: true };
	}

	/**
	 * Resolves a guild or user to its ID.
	 * @param {{id:String}|String} guildOrUser Object to resolve to an ID.
	 * @returns {String} ID of the guild or user.
	 */
	static getId(guildOrUser) {
		if (typeof guildOrUser === "string")
			return guildOrUser;
		else if (typeof guildOrUser.id === "string")
			return guildOrUser.id;
		else throw new Error("Invalid Id specified.");
	}

	/**
	 * Gets role rewards set for a guild.
	 * @param {{id:String}|String} guild Guild to get role rewards of.
	 * @returns {Promise<[Object]>} Role rewards set for this guild.
	 */
	static async getRoleRewards(guild) {
		const guildId = this.getId(guild);
		const { body: { role_rewards } } = await got.get(`${guildId}?limit=1`, this.options);
		return role_rewards.sort((a, b) => a.rank - b.rank).map(({ rank, ...rest }) => ({ ...rest, level: rank }));
	}

	/**
	 * Get a page of the leaderboard of a guild.
	 * @param {{id:String}|String} guild Guild to get the leaderboard of.
	 * @param {Number} limit Limit of users to fetch per page. Maximum 1000.
	 * @param {Number} page Number of pages to skip.
	 * @returns {Promise<[Object]>} Leaderboard page.
	 */
	static async getLeaderboardPage(guild, limit = 1000, page = 0) {
		const guildId = this.getId(guild);
		const { body: { players } } = await got.get(`${guildId}?limit=${limit}&page=${page}`, this.options);
		return players.map((user, index) => {
			const { id, level, username, discriminator, avatar } = user;
			const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}?size=2048`;
			const [userXp, levelXp, totalXp] = user.detailed_xp;
			return {
				id, level, username, discriminator, avatarUrl,
				tag: `${username}#${discriminator}`,
				xp: { userXp, levelXp, totalXp },
				rank: (limit * page) + index + 1
			};
		});
	}

	/**
	 * Get the leaderboard of a guild.
	 * @param {{id:String}|String} guild Guild to get the leaderboard of.
	 * @returns {Promise<[Object]>} Leaderboard of the guild.
	 */
	static async getLeaderboard(guild) {
		const leaderboard = [];
		let pageNumber = 0, page;
		while (true) {
			page = await this.getLeaderboardPage(guild, 1000, pageNumber);
			leaderboard.push(...page);
			if (page.length < 1000) break;
			pageNumber += 1;
		}
		return leaderboard;
	}

	/**
	 * Get the XP of an individual user in a guild.
	 * @param {{id:String}|String} guild Guild the user is in.
	 * @param {{id:String}|String} user User to get the XP of.
	 * @returns {Promise<Object|undefined>} XP information of the user.
	 */
	static async getUserXp(guild, user) {
		const userId = this.getId(user);
		const leaderboard = await this.getLeaderboard(guild);
		return leaderboard.find(user => user.id === userId);
	}
}

module.exports = Mee6LevelsApi;