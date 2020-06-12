
import storageSession from 'redux-persist/es/storage/session';
import reducer from './reducer';

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage: storageSession
}
 
const persistedReducer = persistReducer(persistConfig, reducer)
 
export default () => {
  let store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  let persistor = persistStore(store);
  
  return { store, persistor }
}