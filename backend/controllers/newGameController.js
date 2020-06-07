const { getPlayerByNick, addGameToPlayer } = require('../models/model');

module.exports = {
  newGameController: (req, res) => {
    let { nick, rules } = req.body;

    let player = getPlayerByNick(nick);

    addGameToPlayer(player, rules);

    return res.send(JSON.stringify({
      OK: true,
      message: ''
    }));
  }
}