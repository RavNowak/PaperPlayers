import React from 'react';
import styles from './InteractionComponent.module.scss';

import { AcceptMovesButton } from '../../Common/MaterialUI/Button';

class InteractionComponent extends React.Component {
  handleSendMovesClick = () => {
    this.props.sendMoves();
  }

  renderTime = () => {
    if (this.props.second > 10) {
      return <p className={styles.aLotOfTime}>{this.props.second}</p>
    }

    return <p className={styles.lessThan10Sec}>{this.props.second}</p>
  }

  render = () => {
    return (
      
      <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.whovswho}>{this.props.whovswho}</div>
        <div className={styles.botMessage}>{this.props.botMessage}</div>
      </div>
        {
          this.props.allowMove ?
          <div className={styles.circle}>
            <AcceptMovesButton onClick={this.handleSendMovesClick}>CONFIRM</AcceptMovesButton>
            {this.renderTime()}
          </div> :
          <div className={styles.circle}>
            <AcceptMovesButton disabled onClick={this.handleSendMovesClick}>CONFIRM</AcceptMovesButton>
            <p className={styles.timeDisabled}>{this.props.second}</p>
          </div>
        }
        <div className={styles.bottomSection}>
          <a className={styles.rules} href="https://pl.wikipedia.org/wiki/Pi%C5%82karzyki_na_kartce" target="_blank">Remind the rules</a> 
        </div>
      </div>
      
    )
  }
}

export default InteractionComponent;