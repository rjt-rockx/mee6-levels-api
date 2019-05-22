# mee6-levels-api
An API wrapper for Mee6 levels

## Usage
```js
const Mee6LevelsApi = require("mee6-levels-api");

const guildId = "159962941502783488"; // or a Guild object with the id property
const userId = "136777781005647872"; // or a User object with the id property

Mee6LevelsApi.getLeaderboard(guildId).then(leaderboard => {
  // do something with leaderboard
  for(const user of leaderboard)
    console.log(`${user.tag} - ${user.rank}`);
};

Mee6LevelsApi.getRoleRewards(guildId).then(rewards => {
  // do something with rewards
  for(const reward of rewards)
    console.log(`${reward.role.name} - Given at level ${reward.rank}`);
};

Mee6LevelsApi.getUserXp(guildId, userId).then(user => {
  // do something with user info
  console.log(`${user.tag} is at level ${user.level} and rank ${user.rank}.`);
};
```
