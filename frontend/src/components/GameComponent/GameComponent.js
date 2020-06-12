import React from 'react';
import BoardComponent from '../BoardComponent/BoardComponent';
import ChatComponent from '../ChatComponent/ChatComponent';
import InteractionComponent from '../InteractionComponent/InteractionComponent';
import Socket from '../../Common/Socket/Socket';
import styles from './GameComponent.module.scss';

import { connect } from 'react-redux';
import { EventEmitter } from '../../Common/EventEmitter';
import { setOponent, setRules, setInitializer } from '../../redux/action';
import { gamesService } from '../../services/gamesService';
import { EventType } from '../../Common/EventTypes';

class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.moves = [];
    this.timePerRound = null;
    this.timer = null;

    this.state = {
      whovswho: `${this.props.nick} VS ?`,
      botMessage: 'Waiting for the oponent',
      allowMove: false,
      second: null,
      gameended: false
    }

    this.socket = new Socket(this.props.nick, this.props.oponent);
  }

  componentDidMount = () => {
    EventEmitter.subscribe(EventType.NEW_OPONENT, this.handleNewOponentAppear);
    EventEmitter.subscribe(EventType.GAME_MOVES, this.handleRecivedMoves);
    EventEmitter.subscribe(EventType.USER_LEAVE, this.handleOponentLeave);
    EventEmitter.subscribe(EventType.USER_SURREND, this.handleOponentSurrended);
    EventEmitter.subscribe(EventType.USER_WIN, this.handleOponentWin);

    this.setTimePerRound();
    this.handeFastGameRecreation();
    
    if (this.props.oponent !== "") {
      this.setState({
        whovswho: `${this.props.oponent} VS ${this.props.nick}`,
        botMessage: 'Waiting for the oponent move',
      })
    }

    document.title = `PaperPlayers (${this.props.nick})`;
  }

  componentWillUnmount = () => {
    this.props.setOponent('');
    this.props.setRules({});
    this.props.setInitializer(false);

    this.socket.kill();
  }

  handleOponentLeave = () => {
      this.setState({
        botMessage: 'Your oponent has left the game.\nGame over.',
        allowMove: false
      });

    this.props.setOponent('');
    this.socket.setOponent('');
  }

  handleOponentSurrended = () => {
    this.setState({
      botMessage: 'Your oponent surrended.\nYou won.',
      allowMove: false,
      gameended: true
    });
  }

  handleOponentWin = () => {
    this.setState({
      botMessage: 'You lost the game.',
      allowMove: false,
      gameended: true
    });
  }

  handleNewOponentAppear = (data) => {
    this.props.setOponent(data.oponent);
    this.socket.setOponent(data.oponent);

    this.setState({
      whovswho: `${this.props.nick} VS ${this.props.oponent}`,
      botMessage: 'Your turn',
      allowMove: true
    });

    this.countTime();
  }

  handeFastGameRecreation = async () => {
    if (this.props.initializer) {
      try {
        await gamesService.adddNewGame(this.props.nick, this.props.rules);
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  handleRecivedMoves = (data) => {
    this.setState({
      botMessage: 'Your turn',
      allowMove: true
    });

    this.countTime();
  }

  saveMove = (move) => {
    for (let i = 0; i < this.moves.length; i++) {
      const obj = this.moves[i];

      if (obj.id === move.id && obj.name === move.name) {
        if (obj.repaint === move.repaint) {
          return;
        }
        else {
          this.moves.splice(i, 1);
      
          return;
        }
      }
    }

    this.moves.push(move);
  }

  setTimePerRound = () => {
    if (this.props.playingForTime) {
      switch (this.props.time) {
        case 'slow':
          this.timePerRound = 120;
          break;
        case 'medium':
          this.timePerRound = 60;
          break;
        case 'fast': 
        this.timePerRound = 30;
          break;
        default: break;
      }

      this.setState({
        second: this.timePerRound
      });
    }
  }

  countTime = () => {
    if (this.props.playingForTime) {
      let currentSecond = this.timePerRound;
  
      this.timer = setInterval(() => {
        if (currentSecond === 0) {
          clearInterval(this.timer);

          this.setState({
            botMessage: 'Waiting for the oponent move',
            second: this.timePerRound,
            allowMove: false
          });

          if (this.props.tourAutocomplete) {
            this.sendMoves();
          }
          else {
            this.handleOutOfTime();
          }
        }
        else {
          --currentSecond;
  
          this.setState({
            second: currentSecond
          });
        }
      }, 1000);
    }
  }

  //
  // If there is no tourAutocompleteand time is off 
  // let's send no moves to notify oponent about his
  // turn.
  //

  handleOutOfTime = () => {
    this.socket.sendMoves([]);
    console.log(this.moves);
    EventEmitter.dispatch(EventType.CLEAR_MOVES, this.moves);

    this.moves = [];
  }

  resetTimer = () => {
    if (this.props.playingForTime) {
      clearInterval(this.timer);

      this.setState({
        second: this.timePerRound
      });
    }
  }

  handleOwnGoal = () => {
    if (!this.state.gameended && this.state.allowMove) {
      this.socket.surrend();
  
      this.setState({
        botMessage: 'You shot own goal. You lost.',
        allowMove: false,
        gameended: true
      });
  
      this.resetTimer();
    }
  }

  handleWin = () => {
    if (!this.state.gameended && this.state.allowMove) {
      this.socket.notifyWin();
  
      this.setState({
        botMessage: 'Congratulations ! You won.',
        allowMove: false,
        gameended: true
      });
  
      this.resetTimer();
    }
  }

  sendMoves = () => {
    const filteredMoves = this.moves.filter(move => {
      return move.repaint === false;
    });

    this.socket.sendMoves(filteredMoves);

    if (filteredMoves.length > 0) {
      EventEmitter.dispatch(EventType.LINE_CONFIRMED, this.moves);
  
      this.moves = [];
    }

    this.resetTimer();

    this.setState({
      botMessage: 'Waiting for the oponent move',
      allowMove: false,
    });
  }

  render = () => {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <InteractionComponent
            whovswho={this.state.whovswho}
            botMessage={this.state.botMessage}
            allowMove={this.state.allowMove}
            second={this.state.second}
            sendMoves={this.sendMoves}
          />
        </div>
        <div className={styles.center}>
          <BoardComponent 
            size={this.props.size}
            allowMove={this.state.allowMove}
            saveMove={this.saveMove}
            notifyOwnGoal={this.handleOwnGoal}
            notifyWin={this.handleWin}
          />
        </div>
        <div className={styles.right}>
          <ChatComponent socket={this.socket} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nick: state.nick,
    size: state.rules.borderSize,
    oponent: state.oponent,
    initializer: state.initializer,
    playingForTime: state.rules.playingForTime,
    time: state.rules.time,
    tourAutocomplete: state.rules.autocomplete,
    rules: state.rules
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setOponent: (oponent) => dispatch(setOponent(oponent)),
    setRules: (rules) => dispatch(setRules(rules)),
    setInitializer: (value) => dispatch(setInitializer(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);