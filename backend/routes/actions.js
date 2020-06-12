const socket = require('socket.io');
const { EventType } = require('./EventTypes');


const { playerInitController } = require('../controllers/socket_playerInitController');
const { newOponentController } = require('../controllers/socket_newOponentController');
const { txtMessageController } = require('../controllers/socket_txtMessageController');
const { playerClearController } = require('../controllers/socket_playerClearController');
const { newMoveController } = require('../controllers/socket_newMoveController');
const { userLeaveController } = require('../controllers/socket_userLeaveController');
const { removeOponentController } = require('../controllers/socket_removeOponentController');
const { disconnectController } = require('../controllers/socket_disconnectController');
const { userSurrendController } = require('../controllers/socket_userSurrendController');
const { userWinController } = require('../controllers/socket_userWinController');

module.exports = {
  initializeWebSocketConnection: (server) => {
    const io = socket(server);

    io.on('connection', (socket) => {
      console.log('New user joined');
   
      socket.on('disconnect', () => {
        
        disconnectController(socket);
      });

      socket.on(EventType.PLAYER_INIT,     (message) => { playerInitController(message, socket) });
      socket.on(EventType.NEW_OPONENT,     (message) => { newOponentController(message) });
      socket.on(EventType.TXT_MESSAGE,     (message) => { txtMessageController(message) });
      socket.on(EventType.GAME_CLEAR,      (message) => { playerClearController(message) });
      socket.on(EventType.GAME_MOVES,      (message) => { newMoveController(message) });
      socket.on(EventType.USER_LEAVE,      (message) => { userLeaveController(message) });
      socket.on(EventType.REMOVE_OPONENT,  (message) => { removeOponentController(message) });
      socket.on(EventType.USER_SURREND,    (message) => { userSurrendController(message) });
      socket.on(EventType.USER_WIN,        (message) => { userWinController(message) });
   });
  }
}