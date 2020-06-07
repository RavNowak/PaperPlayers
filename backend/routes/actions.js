const { playerInitController } = require('../controllers/socket_playerInitController');
const { newOponentController } = require('../controllers/socket_newOponentController');
const { txtMessageController } = require('../controllers/socket_txtMessageController');
const { playerClearController } = require('../controllers/socket_playerClearController');
const { newMoveController } = require('../controllers/socket_newMoveController');
const { pongController } = require('../controllers/socket_pongController');

const WebSocket = require('ws');

module.exports = {
  initializeWebSocketConnection: (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', ws => {
      ws.on('message', (msg) => {
        const message = JSON.parse(msg);

        console.log(message);

        switch (message.type) {
          case 'PLAYER_INIT':
            playerInitController(message, ws);
            break;

          case 'NEW_OPONENT':
            newOponentController(message);
            break;

          case 'TXT_MESSAGE':
            txtMessageController(message);
            break;

          case 'GAME_CLEAR':
            playerClearController(message);
            break;

          case 'GAME_MOVES':
            newMoveController(message);
            break;

          case 'PONG':
            pongController(message);
            break;

          default: console.log('unknown command');
        }
      });
    });
  }
}