let { players } = require('./players');

const getPlayerByNick = (nick) => {
  return (players.find(player => {
    return player.nick === nick;
  }));
}

const getPlayerBySocket = (socket) => {
  return (players.find(player => {
    return player.socket == socket;
  }));
}

const addPlayer = (nick) => {
  players.push({
    nick,
    game: null,
    socket: null,
    oponent: null
  })
}

const getCreatedGames = () => {
  let createdGames = [];

  players.forEach(player => {
    if (player.game && !player.oponent) {
      createdGames.push({
        nick: player.nick,
        game: player.game
      })
    }
  })

  return createdGames;
}

const addGameToPlayer = (player, rules) => {
  player.game = rules;
}

const getPlayerGame = (player) => {
  return player.game;
}

const setPlayerSocket = (player, socket) => {
  player.socket = socket;
}

const removePlayer = (player) => {
  // players = players.filter((player_) => {
  //   return player_.nick != player.nick;
  // })
}

const setPlayerOponent = (player, oponent) => {
  player.oponent = oponent;
}

const clearPlayerInfo = (player) => {
  player.game = null;
  player.socket = null;
  player.oponent = null;
}

module.exports = {
  getPlayerByNick,
  getPlayerBySocket,
  addPlayer,
  getCreatedGames,
  addGameToPlayer,
  getPlayerGame,
  setPlayerSocket,
  removePlayer,
  setPlayerOponent,
  clearPlayerInfo
}