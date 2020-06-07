const { getCreatedGames } = require('../models/model');


module.exports = {
  createdGamesController: (req, res) => {
    const createdGames = getCreatedGames();

    return res.send(JSON.stringify({
      createdGames
    }));
  }
}