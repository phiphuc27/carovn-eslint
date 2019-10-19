import React from 'react';
import '../App.css';
// eslint-disable-next-line import/no-named-as-default
import Board from '../Containers/VisibleBoard';
import GameInfo from '../Containers/VisibleGameInfo';

export default function Game() {
  return (
    <div className="game">
      <Board />
      <GameInfo />
    </div>
  );
}
