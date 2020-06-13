const { getPlayerByNick, setPlayerOponent } = require('../models/model');
const { EventType } = require('../routes/EventTypes');

module.exports = {
  newOponentController: (message) => {
    const callerNick = message.nick;
    const oponentNick = message.oponent;

    let oponent = getPlayerByNick(oponentNick);
    let player = getPlayerByNick(callerNick);

    if(!oponent || !player) return;

    setPlayerOponent(oponent, callerNick);
    setPlayerOponent(player, oponentNick);

    if (!oponent.socket) return;
    
    oponent.socket.send(JSON.stringify({
        type: EventType.NEW_OPONENT,
        oponent: callerNick
      }));
  }
}