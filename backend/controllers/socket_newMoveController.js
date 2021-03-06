const { getPlayerByNick } = require('../models/model');
const { EventType } = require('../routes/EventTypes');

module.exports = {
  newMoveController: (message) => {
    const calle = message.to;
    const moves = message.moves;

    let player = getPlayerByNick(calle);

    if (!player) return;

    player.socket.send(JSON.stringify({
      type: EventType.GAME_MOVES,
      moves
    }));
  }
}