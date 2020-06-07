const { getPlayerByNick, setPlayerOponent } = require('../models/model');

module.exports = {
  newOponentController: (message) => {
    const caller = message.nick;
    const oponentNick = message.oponent;

    let player = getPlayerByNick(oponentNick);

    setPlayerOponent(player, caller);

    player.socket.send(JSON.stringify({
      type: 'NEW_OPONENT',
      oponent: caller
    }));
  }
}