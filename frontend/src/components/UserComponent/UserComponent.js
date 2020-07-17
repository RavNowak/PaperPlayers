import React from 'react';
import ErrorComponent from '../InfoComponent/InfoComponent';
import NickInput from '../../Common/MaterialUI/TextInput';
import styles from './UserComponent.module.scss';

import { OrangeButton } from '../../Common/MaterialUI/Button';
import { connect } from 'react-redux';
import { setNick } from '../../redux/action';
import { registerService } from '../../services/registerService';

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.nick = React.createRef();
    this.loginInfo = 'Connecting to the server . . .';

    this.state = {
      loginState: '',
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      loginState: this.loginInfo
    });

    try {
      const response = await registerService.register(this.nick.value);
      this.handleNickConfirmation(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  handleNickConfirmation = (obj) => {
    if (obj.OK) {
      this.handleCorrectNick();
    }
    else {
      this.handleInvalidNick(obj.message);
    }
  }

  handleCorrectNick = () => {
    this.props.setNick(this.nick.value);
    this.props.history.push('/games');
  }

  handleInvalidNick = (loginState) => {
    this.setState({
      loginState
    })
  }

  handleInputChange = () => {
    if (this.state.loginState !== '' && this.state.loginState !== this.loginInfo) {
      this.setState({
        loginState: ''
      })
    }
  }

  render = () =>
    <div className={styles.main}>
      <span className={styles.paperPlayers}>PAPER PLAYERS</span>
      <form onSubmit={this.handleSubmit}
        className={styles.nickForm}>
        <div className={styles.nickInput}>
          <NickInput label="Type your nick"
            inputRef={n => this.nick = n}
            onChange={this.handleInputChange}>

          </NickInput>
        </div>
        {this.state.loginState ? <ErrorComponent message={this.state.loginState}></ErrorComponent> : ''}
        <div className={styles.nickButton}>
          <OrangeButton type="submit"> Submit </OrangeButton>
        </div>
      </form>
      <div className={styles.gif}></div>
      <a className={styles.rules} href="https://pl.wikipedia.org/wiki/Pi%C5%82karzyki_na_kartce" target="_blank">Don't know the ruls? Check here.</a>
    </div>
}

const mapDispatchToProps = dispatch => {
  return {
    setNick: (nick) => dispatch(setNick(nick))
  }
}

export default connect(null, mapDispatchToProps)(UserComponent);