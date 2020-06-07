const { getPlayerByNick, getPlayerGame } = require('../models/model');

module.exports = {
  initializerRulesController: (req, res) => {
    const nick = req.query.nick;

    const player = getPlayerByNick(nick);
    const game = getPlayerGame(player);

    return res.send(JSON.stringify({
      game
    }))
  }
}