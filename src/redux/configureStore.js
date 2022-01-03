import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import dragonReducer from './dragon/dragon';
import missionReducer from './mission/mission';
import rocketReducer from './rocket/rocket';

const reducer = combineReducers({
  dragonReducer,
  missionReducer,
  rocketReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(logger, thunk),
);

export default store;
