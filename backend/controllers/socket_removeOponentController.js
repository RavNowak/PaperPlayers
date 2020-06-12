const { getPlayerByNick, setPlayerOponent } = require('../models/model');

module.exports = {
  removeOponentController: (message) => {
    const nick = message.nick;

    let player = getPlayerByNick(nick);

    if (!player) return;

    setPlayerOponent(player, null);
  }
}