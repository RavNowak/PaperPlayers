import { EventEmitter } from '../EventEmitter';
import {
  PLAYER_INIT,
  ASK_FOR_GAMES,
  NEW_GAME,
  NEW_OPONENT
} from './messageTypes';

class Socket {
  constructor(nick, oponent) {
    this.socket = new WebSocket('ws://localhost:8080');
    this.nick = nick;
    this.oponent = oponent;

    this.socket.onopen = e => {
      console.log('connected to websocket server');

      this.registerUser();
      this.notifyOponent();
    };

    this.socket.onmessage = e => {
      const message = JSON.parse(e.data);

      if (message.type === 'PING') {
        console.log('recived ping');
        this.socket.send(JSON.stringify(({
          type : 'PONG',
          nick: this.nick
        })))

        return;
      }

      EventEmitter.dispatch(message.type, message);

      console.log(`message received from server: ${e.data}`);
    };


    this.socket.onclose = e => {
      if (e.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`);
      } else {
        console.log('[close] Connection died');
      }
    };

    this.socket.onerror = err => {
      console.log(`[error] ${err.message}`);
    }
  }

  setOponent = (oponent) => {
    this.oponent = oponent;
  }

  registerUser = () => {
    this.socket.send(JSON.stringify({
      type: PLAYER_INIT,
      nick: this.nick
    }))
  }

  notifyOponent = () => {
    if (this.oponent !== "") {
      this.socket.send(JSON.stringify({
        type: NEW_OPONENT,
        nick: this.nick,
        oponent: this.oponent
      }))
    }
  }

  sendTxtMessage = (text) => {
    if (this.oponent !== "") {
      this.socket.send(JSON.stringify({
        type: 'TXT_MESSAGE',
        to: this.oponent,
        text
      }))
    }
  }

  clearGame = () => {
    this.socket.send(JSON.stringify({
      type: 'GAME_CLEAR',
      nick: this.nick,
    }))
  }

  sendMoves = (moves) => {
    if (this.oponent !== "") {
      this.socket.send(JSON.stringify({
        type: 'GAME_MOVES',
        to: this.oponent,
        moves
      }))
    }
  }

}

export default Socket;


