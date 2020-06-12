import React from 'react';
import styles from './ErrorComponent.module.scss';

class ErrorComponent extends React.Component {
  render = () => {
    return (
      <span className={styles.error}>{this.props.message}</span>
    )
  }
}

export default ErrorComponent;