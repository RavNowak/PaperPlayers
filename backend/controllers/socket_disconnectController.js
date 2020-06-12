const { getPlayerBySocket, clearPlayerInfo } = require('../models/model');
const { userLeaveController } = require('./socket_userLeaveController');

module.exports = {
  disconnectController: (socket) => {
    let player = getPlayerBySocket(socket);

    if (!player) return;

    userLeaveController({to: player.oponent});
    clearPlayerInfo(player);

    console.log('Disconnected player: ', player.nick);
  }
}