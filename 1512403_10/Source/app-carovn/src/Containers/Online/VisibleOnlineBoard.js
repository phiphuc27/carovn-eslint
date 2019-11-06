/* eslint-disable import/no-named-as-default */
import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import Board from '../../Components/Game/Board';

const VisibleOnlineBoard = ({ squares, winner, message, onClickSquare }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {message && <Alert variant="primary">{message}</Alert>}
      <div className={winner.name ? 'game-board disabled' : 'game-board'}>
        <Board
          boardSize={20}
          squares={squares}
          onClick={i => onClickSquare(i)}
          winner={winner}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  squares: state.Board.squares,
  winner: state.Board.winner,
  message: state.Online.answerMessage
});

export default connect(mapStateToProps)(VisibleOnlineBoard);
