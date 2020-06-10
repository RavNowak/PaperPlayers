import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { JoinButton } from '../Shared/Button';
import styles from './CreatedGamesComponent.module.scss';
import { connect } from 'react-redux';
import { setRules, setOponent } from '../../redux/action';

const axios = require('axios')

class CreatedGamesComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  renderNoGames = () => {
    return (
      <div className={styles.main} style={{justifyContent: 'center'}}>
        <span className={styles.noGamesFont}>No games found</span>
      </div>
    )
  }

  renderWaitingForGames = () => {
    return (
      <div className={styles.main} style={{justifyContent: 'center'}}>
        <Loader
          type="Oval"
          color="rgb(218, 165, 32)"
          height={70}
          width={70}
        />
        <span className={styles.waitingFont}>Loading, please wait</span>
      </div>
    )
  }

  getBorderSize = (size) => {
    switch(size) {
      case 'small': return '6x10'
      case 'medium': return '8x12'
      case 'big': return '10x14'
    }
  }

  handleJoinButtonClick = async (e) => {
    const gameInitializer = e.currentTarget.parentNode.parentNode.children.item(0).innerHTML;

    try {
      const response = await axios.get('http://localhost:8080/initializerRules', {
        params: {
          nick: gameInitializer
        }
      });

      this.props.setRules(response.data.game);
      this.props.setOponent(gameInitializer);
      this.props.history.push('/game');    
     
    }
    catch(error) {
      console.log(error);
    }
  }

  renderGames = () => {
    return (
      <div className={styles.main}>
        <div className={styles.descriptionGame}>
          <span className={styles.descriptionItem}>Player</span>
          <span className={styles.descriptionItem}>Border size</span>
          <span className={styles.descriptionItem}>Rules</span>
          <span className={styles.descriptionItem}>Join</span>
        </div>
        {
          this.props.games.map(obj => {

            return (
              <div className={styles.singleGame}>
                <span className={styles.playerItem}>{obj.nick}</span>
                <span className={styles.borderSizeItem}>{this.getBorderSize(obj.game.borderSize)}</span>
                <div className={styles.rules}>
                  { obj.game.liveChat && <i className="fas fa-comment"></i> }
                  { !obj.game.liveChat && <i className="fas fa-comment-slash"></i> }
                  { obj.game.playingForTime && <i className="fas fa-hourglass"></i> }
                  { obj.game.autocomplete && <i className="fab fa-autoprefixer"></i>}
                </div>
                <div className={styles.joinButton}>
                  <JoinButton onClick={this.handleJoinButtonClick}>JOIN</JoinButton>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  render = () => {
    if (this.props.games === null) {
      return this.renderWaitingForGames();
    }

    else if (this.props.games.length === 0) {
      return this.renderNoGames();
    }

    else {
      return this.renderGames();
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRules: (rules) => dispatch(setRules(rules)),
    setOponent: (oponent) => dispatch(setOponent(oponent))
  }
}

export default connect(null, mapDispatchToProps)(CreatedGamesComponent);