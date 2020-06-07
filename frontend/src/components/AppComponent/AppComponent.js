import React from 'react';
import SelectGameComponent from '../SelectGameComponent/SelectGameComponent';
import RulesComponent from '../RulesComponent/RulesComponent';
import UserComponent from '../UserComponent/UserComponent';
import GameComponent from '../GameComponent/GameComponent';
import { Provider } from 'react-redux';
import  persist from '../../redux/store';
import styles from './AppComponent.module.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { purgeStoredState } from 'redux-persist'

let { store, persistor } = persist();

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    // persistor.purge();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <div className={styles.appContainer}>
          <Router>
            <div>
              <Route exact path="/" component={UserComponent} />
              <Route path="/games" component={SelectGameComponent} />
              <Route path="/createGame" component={RulesComponent} />
              <Route path="/game" component={GameComponent} />
            </div>
          </Router>
        </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default AppComponent;

{/* <div className="appContainer"> */ }
{/* <GoalComponent /> */ }
{/* <BoardComponent rows={6} columns={10} /> */ }
{/* <BoardComponent rows={8} columns={12} /> */ }
{/* <BoardComponent rows={10} columns={14} /> */ }
{/* <GoalComponent /> */ }
// </div>