import { EventEmitter } from '../EventEmitter';
import { EventType } from '../EventTypes';
import io from 'socket.io-client';

class Socket {
  constructor(nick, oponent) {
    // this.socket = io('https://paperplayers.herokuapp.com/');
    this.socket = io('http://localhost:8080');
  
    this.nick = nick;
    this.oponent = oponent;

    this.socket.on('connect', () => {
      this.registerUser();
      this.notifyOponent();
    });

    this.socket.on('disconnect', () => {
    });

    this.socket.on('message', (data) => {
      const message = JSON.parse(data);

      EventEmitter.dispatch(message.type, message);
    });


    this.socket.on('error', (err) => {
      console.log('Socket error: ', err);
    });
  }

  setOponent = (oponent) => {
    this.oponent = oponent;
  }

  registerUser = () => {
    this.socket.emit(EventType.PLAYER_INIT, {
      nick: this.nick
    });
  }

  notifyOponent = () => {
    if (this.oponent !== "") {
      this.socket.emit(EventType.NEW_OPONENT, {
        nick: this.nick,
        oponent: this.oponent
      });
    }
  }

  sendTxtMessage = (text) => {
    if (this.oponent !== "") {
      this.socket.emit(EventType.TXT_MESSAGE, {
        to: this.oponent,
        text
      });
    }
  }

  clearGame = () => {
    this.socket.emit(EventType.GAME_CLEAR, {
      nick: this.nick
    });
  }

  sendMoves = (moves) => {
    if (this.oponent !== "") {
      this.socket.emit(EventType.GAME_MOVES, {
        to: this.oponent,
        moves
      });
    }
  }

  notifyLeave = () => {
    if (this.oponent !== "") {
      this.socket.emit(EventType.USER_LEAVE, {
        to: this.oponent
      });
    }
  }

  removeOponent = () => {
    this.socket.emit(EventType.REMOVE_OPONENT, {
      nick: this.nick
    });
  }

  surrend = () => {
    this.socket.emit(EventType.USER_SURREND, {
      to: this.oponent
    });
  }

  notifyWin = () => {
    this.socket.emit(EventType.USER_WIN, {
      to: this.oponent
    });
  }

  kill = () => {
    this.socket.close();
  }
}

export default Socket;


