let { players } = require('./players');

const getPlayerByNick = (nick) => {
  return (players.find(player => {
    return player.nick === nick;
  }));
}

const addPlayer = (nick) => {
  players.push({
    nick,
    game: null,
    socket: null,
    oponent: null,
    pingState: true,
    ping: null
  })
}

const getCreatedGames = () => {
  let createdGames = [];

  players.forEach(player => {
    if (player.game !== null) {
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
  players = players.filter((player_) => {
    return player_.nick != player.nick;
  })

  console.log('removed player');
}

const stopPlayerPing = (player) => {
  clearInterval(player.ping);
}

const setPlayerPingState = (player, state) => {
  player.pingState = state;
}

const startPlayerPing = (player, offlineCallback, onlineCallback, interval) => {
  player.ping = setInterval(() => {
    if (player.pingState === false) {
      stopPlayerPing(player);
      offlineCallback();
    }
    else {
      setPlayerPingState(player, false);
      onlineCallback();
    }
  }, interval);
}

const setPlayerOponent = (player, oponent) => {
  player.oponent = oponent;
}

const clearPlayerInfo = (player) => {
  player.game = null;
  player.oponent = null;
}

module.exports = {
  getPlayerByNick,
  addPlayer,
  getCreatedGames,
  addGameToPlayer,
  getPlayerGame,
  setPlayerSocket,
  removePlayer,
  stopPlayerPing,
  setPlayerPingState,
  startPlayerPing,
  setPlayerOponent,
  clearPlayerInfo
}