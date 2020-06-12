const { getPlayerByNick, clearPlayerInfo } = require('../models/model');

module.exports = {
  playerClearController: (message) => {
    const nick = message.nick;

    let player = getPlayerByNick(nick);

    if (!player) return;

    clearPlayerInfo(player);
  }
}