const { getPlayerByNick } = require('../models/model');

module.exports = {
  newMoveController: (message) => {
    const calle = message.to;
    const moves = message.moves;

    let player = getPlayerByNick(calle);

    player.socket.send(JSON.stringify({
      type: 'GAME_MOVES',
      moves
    }));
  }
}