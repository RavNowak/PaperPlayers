const { getPlayerByNick } = require('../models/model');
const { EventType } = require('../routes/EventTypes');

module.exports = {
  userWinController: (message) => {
    const calle = message.to;

    let player = getPlayerByNick(calle);

    if (player && player.socket) {
      player.socket.send(JSON.stringify({
        type: EventType.USER_WIN,
      }));
    }
  }
}