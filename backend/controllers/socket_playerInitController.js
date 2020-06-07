const { getPlayerByNick, setPlayerSocket, removePlayer, startPlayerPing, stopPlayerPing } = require('../models/model');

module.exports = {
  playerInitController: (message, socket) => {
    const nick = message.nick;

    let player = getPlayerByNick(nick);

    if (!player) return;
  
    if (player.socket) {
      stopPlayerPing(player);
    }

    setPlayerSocket(player, socket);
    
    startPlayerPing(player, () => {
      removePlayer(player);
    }, () => {
      player.socket.send(JSON.stringify({
        type: 'PING'
      }));
    }, 40000);
  }
}