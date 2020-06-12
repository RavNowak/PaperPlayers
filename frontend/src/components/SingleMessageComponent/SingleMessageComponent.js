import React from 'react';
import styles from './SingleMessageComponent.module.scss';

class SingleMessageComponent extends React.Component {
  render = () => (
    <div>
      {
        this.props.author === 'user' ?
        (
          <>
          <span className={styles.userMessage}>{this.props.text}</span>
          <span className={styles.userTime}>{this.props.time}</span>
          </>
        ) :
        (
          <>
          <div className={styles.oponentMessage}>{this.props.text}</div>
          <span className={styles.oponentTime}>{this.props.time}</span>
          </>
        )
      }
    </div>
  )
}

export default SingleMessageComponent;