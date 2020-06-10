const { getPlayerByNick, clearPlayerInfo } = require('../models/model');

module.exports = {
  playerClearController: (message) => {
    console.log('CLEAR GAME!!!!');
    const nick = message.nick;

    let player = getPlayerByNick(nick);

    clearPlayerInfo(player);
  }
}