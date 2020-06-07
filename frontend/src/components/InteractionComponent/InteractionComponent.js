import React from 'react';
import styles from './InteractionComponent.module.scss';
import { AcceptMovesButton } from '../Shared/Button';

class InteractionComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSendMovesClick = () => {
    this.props.sendMoves();
  }

  render = () => {
    return (
      
      <div className={styles.container}>
        <div className={styles.whovswho}>{this.props.whovswho}</div>
        <div className={styles.botMessage}>{this.props.botMessage}</div>
        {
          this.props.allowMove ?
          <AcceptMovesButton onClick={this.handleSendMovesClick}>CONFIRM MOVES</AcceptMovesButton> :
          <AcceptMovesButton disabled onClick={this.handleSendMovesClick}>CONFIRM MOVES</AcceptMovesButton>
        }
      </div>
      
    )
  }
}

export default InteractionComponent;