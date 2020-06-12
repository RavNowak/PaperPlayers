import React from 'react';
import CreatedGamesComponent from '../CreatedGamesComponent/CreatedGamesComponent';
import styles from './SelectGameComponent.module.scss';

import { OrangeButton } from '../../Common/MaterialUI/Button';
import { gamesService } from '../../services/gamesService';

class GamesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: null
    }
  }

  handleCreatedGamesConfirmation = (obj) => {
    this.setState({
      games: obj.createdGames
    })
  }

  handleCreateOwnGame = () => {
    this.props.history.push('/createGame');
  }
  
  componentDidMount = async () => {
    try {
      const response = await gamesService.getCreatedGames();

      this.handleCreatedGamesConfirmation(response.data);
    }
    catch(error) {
      console.log(error);
    }
  }

  render = () =>
      <div className={styles.main}>
        <span className={styles.gameFont}>Create your game</span>
        <div className={styles.createGameButton}>
          <OrangeButton onClick={this.handleCreateOwnGame}>Create</OrangeButton>
        </div>
        <span className={styles.gameFont}>Or join to existing ones</span>
        <div className={styles.createdGames}>
          <CreatedGamesComponent  games={this.state.games} history={this.props.history}></CreatedGamesComponent>
        </div>
      </div>
}

export default GamesComponent;