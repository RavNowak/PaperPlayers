const { getPlayerByNick, setPlayerSocket } = require('../models/model');

module.exports = {
  playerInitController: (message, socket) => {
    const nick = message.nick;

    let player = getPlayerByNick(nick);

    if (!player) return;
  
    setPlayerSocket(player, socket);
  }
}