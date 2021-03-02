# mee6-levels-api
An unofficial API wrapper for the Mee6 levels plugin.

## Note
While this package works (at the time of writing this), it is neither developed nor officially supported by the Mee6 team. The API route used here is undocumented and is subject to change at any point of time. 

Please do not ask for support for this package at the Mee6 Support server. Instead, you may message me directly at rjt#2336 or open an issue here for any concerns related to this package. 

## Usage
```js
const Mee6LevelsApi = require("mee6-levels-api");

const guildId = "159962941502783488"; // or a Guild object with the id property
const userId = "258258856189231104"; // or a User object with the id property

Mee6LevelsApi.getLeaderboardPage(guildId).then(leaderboard => {
	// do something with leaderboard
	console.log(`${leaderboard.length} members ranked on the leaderboard.`);
});

Mee6LevelsApi.getRoleRewards(guildId).then(rewards => {
	// do something with rewards
	for (const reward of rewards)
		console.log(`${reward.role.name} - Given at level ${reward.level}`);
});

Mee6LevelsApi.getUserXp(guildId, userId).then(user => {
	// do something with user info
	console.log(`${user.tag} is at level ${user.level} and rank ${user.rank}.`);
});
```
