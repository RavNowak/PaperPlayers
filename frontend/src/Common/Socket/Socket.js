import { EventEmitter } from '../EventEmitter';
import io from 'socket.io-client';
import {
  PLAYER_INIT,
  ASK_FOR_GAMES,
  NEW_GAME,
  NEW_OPONENT
} from './messageTypes';

class Socket {
  constructor(nick, oponent) {
    this.socket = io('http://localhost:8080');
  
    this.nick = nick;
    this.oponent = oponent;

    this.socket.on('connect', () => {
      console.log('connected to websocket server');

      this.registerUser();
      this.notifyOponent();
    });

    this.socket.on('message', (data) => {
      const message = JSON.parse(data);

      EventEmitter.dispatch(message.type, message);

      console.log(`message received from server: ${data}`);
    });

    this.socket.on('disconnect', () => {
      console.log('A user disconnected');
    });

    this.socket.on('error', (err) => {
      console.log('Socket error: ', err);
    });
  }

  setOponent = (oponent) => {
    this.oponent = oponent;
  }

  registerUser = () => {
    this.socket.emit(PLAYER_INIT, {
      nick: this.nick
    });
  }

  notifyOponent = () => {
    console.log('notifyOponent');
    
    if (this.oponent !== "") {
      this.socket.emit(NEW_OPONENT, {
        nick: this.nick,
        oponent: this.oponent
      });
    }
  }

  sendTxtMessage = (text) => {
    if (this.oponent !== "") {
      this.socket.emit('TXT_MESSAGE', {
        to: this.oponent,
        text
      });
    }
  }

  clearGame = () => {
    this.socket.emit('GAME_CLEAR', {
      nick: this.nick
    });
  }

  sendMoves = (moves) => {
    if (this.oponent !== "") {
      this.socket.emit('GAME_MOVES', {
        to: this.oponent,
        moves
      });
    }
  }

  notifyLeave = () => {
    if (this.oponent !== "") {
      this.socket.emit('USER_LEAVE', {
        to: this.oponent
      });
    }
  }

  removeOponent = () => {
    this.socket.emit('REMOVE_OPONENT', {
      nick: this.nick
    });
  }

  kill = () => {
    this.socket.close();
  }

}

export default Socket;


