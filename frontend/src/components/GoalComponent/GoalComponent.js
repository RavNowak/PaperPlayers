import React from 'react';
import styles from './GoalComponent.module.scss';
import { connect } from 'react-redux';

class GoalComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderGoal = () => {
    if (this.props.left) {
      switch (this.props.initializatorColor) {
        case 'red': return <div className={styles.redGoal}></div>
        case 'green': return <div className={styles.greenGoal}></div>
        case 'blue': return <div className={styles.blueGoal}></div>
      }
    }
    else if (this.props.right) {
      switch (this.props.oponentColor) {
        case 'red': return <div className={styles.redGoal}></div>
        case 'green': return <div className={styles.greenGoal}></div>
        case 'blue': return <div className={styles.blueGoal}></div>
      }
    }
  }

  render = () => {
    return (
      <div className={styles.goalContainer}>
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