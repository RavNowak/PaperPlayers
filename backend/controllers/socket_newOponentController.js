const { getPlayerByNick, setPlayerOponent } = require('../models/model');

module.exports = {
  newOponentController: (message) => {
    const callerNick = message.nick;
    const oponentNick = message.oponent;

    let oponent = getPlayerByNick(oponentNick);
    let player = getPlayerByNick(callerNick);

    setPlayerOponent(oponent, callerNick);
    setPlayerOponent(player, oponentNick);
    
    oponent.socket.send(JSON.stringify({
        type: 'NEW_OPONENT',
        oponent: callerNick
      }));
  }
}