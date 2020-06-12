import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import styles from './CheckBox.module.scss';

const NewCheckBox = withStyles({
  root: {
    color: 'rgb(218, 165, 32)',
    fontSize: 16,
    '&$checked': {
      color: 'rgba(218, 165, 32, 0.809)',
    },
  },
  checked: {},
})((Checkbox));


class OrangeCheckBox extends React.Component {
  render = () => {
    return (
        <div className={styles.checkBoxWrapper}>
          <NewCheckBox checked={this.props.checked} onChange={this.props.handleChange} />
          <span className={styles.label}>{this.props.label}</span>
        </div>
      
    );
  }
}

export default OrangeCheckBox