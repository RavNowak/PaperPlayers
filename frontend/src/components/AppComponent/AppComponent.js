import React from 'react';
import RouteGuard from '../../Common/RouteGuard';
import  persist from '../../redux/store';
import styles from './AppComponent.module.scss';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

let { store, persistor } = persist();

class AppComponent extends React.Component {
  render = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <div className={styles.appContainer}>
          <Router>
            <div>
              <Switch >
              <Route exact path="/" component={RouteGuard} />
              <Route path="/games" component={RouteGuard} />
              <Route path="/createGame" component={RouteGuard} />
              <Route path="/game" component={RouteGuard} />
              <Route component={RouteGuard} />
              </Switch >
            </div>
          </Router>
        </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default AppComponent;