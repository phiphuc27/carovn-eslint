/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickSquare, checkWinner } from '../Actions';
import Board from '../Components/Game/Board';

export class VisibleBoard extends Component {
  onClick(i) {
    const { dispatch } = this.props;
    dispatch(clickSquare(i));
    dispatch(checkWinner);
  }

  render() {
    const { squares, winner } = this.props;
    return (
      <div className="game-board">
        <Board
          boardSize={20}
          squares={squares}
          onClick={i => this.onClick(i)}
          winner={winner}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  squares: state.Board.squares,
  xIsNext: state.Board.xIsNext,
  winner: state.Board.winner
});

export default connect(mapStateToProps)(VisibleBoard);
