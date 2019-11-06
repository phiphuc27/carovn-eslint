import React from 'react';
import '../../App.css';
// eslint-disable-next-line import/no-named-as-default
import Board from '../../Containers/Game/VisibleBoard';
import GameInfo from '../../Containers/Game/VisibleGameInfo';

export default function Game() {
  return (
    <div className="game">
      <Board />
      <GameInfo />
    </div>
  );
}
