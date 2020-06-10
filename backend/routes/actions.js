const socket = require('socket.io');

const { playerInitController } = require('../controllers/socket_playerInitController');
const { newOponentController } = require('../controllers/socket_newOponentController');
const { txtMessageController } = require('../controllers/socket_txtMessageController');
const { playerClearController } = require('../controllers/socket_playerClearController');
const { newMoveController } = require('../controllers/socket_newMoveController');
const { userLeaveController } = require('../controllers/socket_userLeaveController');
const { removeOponentController } = require('../controllers/socket_removeOponentController');
const { disconnectController } = require('../controllers/socket_disconnectController');

module.exports = {
  initializeWebSocketConnection: (server) => {
    const io = socket(server);

    io.on('connection', (socket) => {
      console.log('New user joined');
   
      socket.on('disconnect', () => {
        
        disconnectController(socket);
      });

      socket.on('PLAYER_INIT',     (message) => { playerInitController(message, socket) });
      socket.on('NEW_OPONENT',     (message) => { newOponentController(message) });
      socket.on('TXT_MESSAGE',     (message) => { txtMessageController(message) });
      socket.on('GAME_CLEAR',      (message) => { playerClearController(message) });
      socket.on('GAME_MOVES',      (message) => { newMoveController(message) });
      socket.on('USER_LEAVE',      (message) => { userLeaveController(message) });
      socket.on('REMOVE_OPONENT',  (message) => { removeOponentController(message) });
   });
  }
}