import { combineReducers } from 'redux';
import Board from './checkBoard';
import GameInfo from './checkGameInfo';

export default combineReducers({
  Board,
  GameInfo
});
