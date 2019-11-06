import { combineReducers } from 'redux';
import Board from './checkBoard';
import GameInfo from './checkGameInfo';
import Register from './register';
import Login from './login';
import Profile from './profile';
import Online from './checkOnline';

const allReducer = combineReducers({
  Board,
  Online,
  GameInfo,
  Register,
  Login,
  Profile
});

const rootReducer = (state, action) => {
  let newState = { ...state };
  if (action.type === 'LOG_OUT') newState = undefined;
  return allReducer(newState, action);
};

export default rootReducer;
