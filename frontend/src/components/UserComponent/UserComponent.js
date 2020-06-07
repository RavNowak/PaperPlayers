import React from 'react';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import NickInput from '../Shared/TextInput';
import { OrangeButton } from '../Shared/Button';
import { connect } from 'react-redux';
import { setNick } from '../../redux/action';
import styles from './UserComponent.module.scss';

const axios = require('axios');

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.nick = React.createRef();

    this.state = {
      nickError: '',
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/register', {
        nick: this.nick.value
      });

      this.handleNickConfirmation(response.data);
    }
    catch(error) {
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

  handleInvalidNick = (nickError) => {
    this.setState({
      nickError
    })
  }

  handleInputChange = () => {
    if (this.state.nickError !== '') {
      this.setState({
        nickError: ''
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
        {this.state.nickError ? <ErrorComponent message={this.state.nickError}></ErrorComponent> : ''}
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