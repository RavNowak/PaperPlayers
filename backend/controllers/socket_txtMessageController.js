const { getPlayerByNick } = require('../models/model');

module.exports = {
  txtMessageController: (message) => {
    const calle = message.to;
    const text = message.text;

    let player = getPlayerByNick(calle);

    player.socket.send(JSON.stringify({
      type: 'TXT_MESSAGE',
      text
    }));
  }
}