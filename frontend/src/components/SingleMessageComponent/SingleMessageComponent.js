import React from 'react';
import styles from './SingleMessageComponent.module.scss';
import moment from 'moment';

class SingleMessageComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getTime = () => {
    return moment().format("H:mm");
  }


  render = () => (
    <div>
      {
        this.props.author === 'user' ?
        (
          <>
          <span className={styles.userMessage}>{this.props.text}</span>
          <span className={styles.userTime}>{this.getTime()}</span>
          </>
        ) :
        (
          <>
          <div className={styles.oponentMessage}>{this.props.text}</div>
          <span className={styles.oponentTime}>{this.getTime()}</span>
          </>
        )
      }
    </div>
  )
}

export default SingleMessageComponent;