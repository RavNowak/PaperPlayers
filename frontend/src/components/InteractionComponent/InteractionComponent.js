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
      <div className={styles.top}>
        <div className={styles.whovswho}>{this.props.whovswho}</div>
        <div className={styles.botMessage}>{this.props.botMessage}</div>
      </div>
        {
          this.props.allowMove ?
          <AcceptMovesButton onClick={this.handleSendMovesClick}>CONFIRM</AcceptMovesButton> :
          <AcceptMovesButton disabled onClick={this.handleSendMovesClick}>CONFIRM</AcceptMovesButton>
        }
        <div className={styles.bottom}>
          Forgot rules ? 
        </div>
      </div>
      
    )
  }
}

export default InteractionComponent;