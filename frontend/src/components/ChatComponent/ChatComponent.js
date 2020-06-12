import React from 'react';
import SingleMessageComponent from '../SingleMessageComponent/SingleMessageComponent';
import moment from 'moment';
import styles from './ChatComponent.module.scss';

import { SendButton } from '../../Common/MaterialUI/Button';
import { EventEmitter } from '../../Common/EventEmitter';
import { connect } from 'react-redux';
import { EventType } from '../../Common/EventTypes';

class ChatComponent extends React.Component {
  constructor(props) {
    super(props);

    this.message = React.createRef();

    this.state = {
      messages: [],
      disabledChatWarning: false
    }
  }

  componentDidMount = () => {
    EventEmitter.subscribe(EventType.TXT_MESSAGE, this.handleRemoteMessage);
  }

  handleNewMessage = (e) => {
    e.preventDefault();

    this.handleLocalMessage();

    if (this.props.isChatEnabled) {
      this.props.socket.sendTxtMessage(this.message.value);
    }

    this.message.value = '';
  }

  handleRemoteMessage = (data) => {
    this.state.messages.push({
      author: 'oponent',
      text: data.text,
      time: this.getTime()
    });

    this.setState({
      messages: this.state.messages
    })
  }

  handleLocalMessage = () => {
    this.state.messages.push({
      author: 'user',
      text: this.message.value,
      time: this.getTime()
    });

    this.setState({
      messages: this.state.messages
    })
  }

  renderMessage = (message) => {
    return (
      <div>
        {message.author === 'user' ?
          <span className={styles.userMessage}>{message.text}</span> :
          <div className={styles.oponentMessage}>{message.text}</div>}
      </div>)
  }

  getTime = () => {
    return moment().format("H:mm");
  }

  render = () => {
    return (
      <div className={styles.container}>
        <div className={styles.messages}>
          {
            this.state.messages.map(message =>
              <SingleMessageComponent author={message.author} text={message.text} time={message.time}></SingleMessageComponent>
            )
          }
        </div>

        <form onSubmit={this.handleNewMessage} className={styles.messageCreation}>
          {
            this.props.isChatEnabled && this.props.oponent ?
            (
              <>
              <input type="text"
                placeholder="Type your message"
                ref={m => this.message = m}
                className={styles.messageInput}>
              </input>
              <SendButton type="submit"> Send </SendButton>
              </>
            ) :
            <>
              <input type="text"
                placeholder="Chat is disabled"
                className={styles.messageInput}
                disabled>
              </input>
              <SendButton type="submit" disabled> Send </SendButton>
              </>
          }

        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isChatEnabled: state.rules.liveChat,
    oponent: state.oponent
  }
};

export default connect(mapStateToProps, null)(ChatComponent);