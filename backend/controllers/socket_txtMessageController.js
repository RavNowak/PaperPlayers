const { getPlayerByNick } = require('../models/model');
const { EventType } = require('../routes/EventTypes');

module.exports = {
  txtMessageController: (message) => {
    const calle = message.to;
    const text = message.text;

    let player = getPlayerByNick(calle);

    if (!player) return;

    player.socket.send(JSON.stringify({
      type: EventType.TXT_MESSAGE,
      text
    }));
  }
}