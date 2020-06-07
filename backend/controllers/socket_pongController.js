const { getPlayerByNick, setPlayerPingState } = require('../models/model');

module.exports = {
  pongController: (message) => {
    const nick = message.nick;

    let player = getPlayerByNick(nick);

    setPlayerPingState(player, true);
  }
}