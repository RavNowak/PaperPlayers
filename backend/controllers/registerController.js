const { getPlayerByNick, addPlayer } = require('../models/model');


module.exports = {
  registerController: (req, res) => {
    const { nick } = req.body;

    if (nick === '') {
      return res.send(JSON.stringify({
        OK: false,
        message: 'Empty nick ? Please be serious'
      }))
    }

    const foundPlayer = getPlayerByNick(nick);

    if (foundPlayer) {
      return res.send(JSON.stringify({
        OK: false,
        message: 'Passed nick already exists'
      }));
    }

    addPlayer(nick);

    return res.send(JSON.stringify({
      OK: true,
      message: ''
    }));
  }
}