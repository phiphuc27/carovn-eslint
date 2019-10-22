import { combineReducers } from 'redux';
import Board from './checkBoard';
import GameInfo from './checkGameInfo';
import Register from './register';
import Login from './login';

const allReducer = combineReducers({
  Board,
  GameInfo,
  Register,
  Login
});

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === 'LOG_OUT') newState = undefined;
  return allReducer(newState, action);
};

export default rootReducer;
