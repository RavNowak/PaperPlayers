import React from 'react';
import styles from './InfoComponent.module.scss';

class ErrorComponent extends React.Component {
  render = () => {
    return (
      <span className={styles.info}>{this.props.message}</span>
    )
  }
}

export default ErrorComponent;