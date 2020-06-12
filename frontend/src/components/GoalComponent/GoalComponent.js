import React from 'react';
import styles from './GoalComponent.module.scss';

import { connect } from 'react-redux';

class GoalComponent extends React.Component {
  renderGoal = () => {
    if (this.props.left) {
      switch (this.props.initializatorColor) {
        case 'red': return <div className={styles.redGoal}></div>
        case 'green': return <div className={styles.greenGoal}></div>
        case 'blue': return <div className={styles.blueGoal}></div>
        default: break;
      }
    }
    else if (this.props.right) {
      switch (this.props.oponentColor) {
        case 'red': return <div className={styles.redGoal}></div>
        case 'green': return <div className={styles.greenGoal}></div>
        case 'blue': return <div className={styles.blueGoal}></div>
        default: break;
      }
    }
  }

  handleGoalClick = (e) => {
    if (this.props.initializer) {
      if (this.props.left) {
        this.props.notifyOwnGoal();
      }
      else if (this.props.right) {
        this.props.notifyWin();
      }
    }
    else {
      if (this.props.left) {
        this.props.notifyWin();
      }
      else if (this.props.right) {
        this.props.notifyOwnGoal();
      }
    }
  }

  render = () => {
    return (
      <div className={styles.goalContainer} onClick={this.handleGoalClick}>
        {this.renderGoal()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initializer: state.initializer,
    initializatorColor: state.rules.userColor,
    oponentColor: state.rules.oponentColor
  }
};

export default connect(mapStateToProps, null)(GoalComponent);