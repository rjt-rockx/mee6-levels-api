interface IdentifierObject {
    id: string;
}

type Identifier = IdentifierObject | string;

interface Role {
    color: number;
    hoist: boolean;
    id: string;
    managed: boolean;
    mentionable: boolean;
    name: string;
    permissions: number;
    position: number;
}

interface Reward {
  role: Role;
  level: number;
}

interface XPInfo {
    userXp: number;
    levelXp: number;
    totalXp: number;
}

interface User {
    id: string;
    level: number;
    username: string;
    discriminator: string;
    avatarUrl: string;
    messageCount: number;
    tag: string;
    xp: XPInfo;
    rank: number;
}

export default class Mee6LevelsApi {
    private static getId(guildOrUser: Identifier): string;
    public static async getRoleRewards(guild: Identifier): Promise<Reward[]>;
    public static async getLeaderboardPage(guild: Identifier, limit?: number, page?: number): Promise<User[]>;
    public static async getLeaderboard(guild: Identifier): Promise<User[]>;
    public static async getUserXp(guild: Identifier, user: Identifier): Promise<User | undefined>;
}