import React from 'react';
import styles from './GameComponent.module.scss';
import BoardComponent from '../BoardComponent/BoardComponent';
import ChatComponent from '../ChatComponent/ChatComponent';
import InteractionComponent from '../InteractionComponent/InteractionComponent';
import Socket from '../../Common/Socket/Socket';
import { connect } from 'react-redux';
import { EventEmitter } from '../../Common/EventEmitter';
import { setOponent, setRules, setInitializer } from '../../redux/action';

class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.moves = [];

    this.state = {
      whovswho: `${this.props.nick} VS ?`,
      botMessage: 'Waiting for the oponent',
      allowMove: false
    }

    console.log('GameComponent: ', this.props.nick, ' ', this.props.oponent)
    this.socket = new Socket(this.props.nick, this.props.oponent);
  }

  componentDidMount = () => {
    EventEmitter.subscribe('NEW_OPONENT', this.handleNewOponentAppear);
    EventEmitter.subscribe('GAME_MOVES', this.handleRecivedMoves);
    EventEmitter.subscribe('USER_LEAVE', this.handleOponentLeave);

    if (this.props.oponent !== "") {
      this.setState({
        whovswho: `${this.props.oponent} VS ${this.props.nick}`,
        botMessage: 'Waiting for the oponent move',
      })
    }

    document.title = `PaperPlayers (${this.props.nick})`;
  }

  componentWillUnmount = () => {
    // this.socket.notifyLeave();

    this.props.setOponent('');
    this.props.setRules({});
    this.props.setInitializer(false);

    this.socket.kill();
  }

  handleOponentLeave = () => {
      this.setState({
        botMessage: 'Your oponent has left the game',
        allowMove: false
      });

    this.props.setOponent('');
    this.socket.setOponent('');
  }

  handleNewOponentAppear = (data) => {
    console.log('handleNewOponentAppear');

    this.props.setOponent(data.oponent);
    this.socket.setOponent(data.oponent);

    this.setState({
      whovswho: `${this.props.nick} VS ${this.props.oponent}`,
      botMessage: 'Your turn',
      allowMove: true
    })
  }

  handleRecivedMoves = (data) => {
    this.setState({
      botMessage: 'Your turn',
      allowMove: true
    });
  }

  saveMove = (move) => {
    for (let i = 0; i < this.moves.length; i++) {
      const obj = this.moves[i];

      if (obj.id === move.id && obj.name === move.name) {
        if (obj.repaint === move.repaint) {
          return;
        }
        else {
          this.moves.splice(i,1);
          console.log(this.moves);
          return;
        }
      }
    }

    this.moves.push(move);
    console.log(this.moves);
  }

  sendMoves = () => {
    const filteredMoves = this.moves.filter(move => {
      return move.repaint === false;
    });

    if (filteredMoves.length > 0) {
      this.socket.sendMoves(filteredMoves);

      EventEmitter.dispatch('LINE_CONFIRMED', this.moves);
      this.moves = [];
    }

    this.setState({
      botMessage: 'Waiting for the oponent move',
      allowMove: false
    })
  }

  render = () => {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <InteractionComponent
            whovswho={this.state.whovswho}
            botMessage={this.state.botMessage}
            allowMove={this.state.allowMove}
            sendMoves={this.sendMoves}
          />
        </div>
        <div className={styles.center}>
          <BoardComponent size={this.props.size} saveMove={this.saveMove} />
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
    initializer: state.initializer
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