const { getPlayerByNick } = require('../models/model');

module.exports = {
  userLeaveController: (message) => {
    const calle = message.to;

    let player = getPlayerByNick(calle);

    if (player && player.socket) {
      player.socket.send(JSON.stringify({
        type: 'USER_LEAVE',
      }));
    }
  }
}