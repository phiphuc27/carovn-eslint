import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

export class Board extends Component {
  renderSquare(row, col) {
    const { winner, boardSize, squares, onClick } = this.props;
    const i = row * boardSize + col;
    let winnerName;
    if (winner.moves !== null) {
      winnerName = winner.moves.includes(i) ? winner.name : '';
    } else {
      winnerName = '';
    }
    return (
      <Square
        key={[row, col]}
        value={squares[i]}
        onClick={() => onClick(i)}
        winner={winnerName}
      />
    );
  }

  render() {
    const { boardSize } = this.props;
    const size = boardSize;
    return (
      <div>
        {[...Array(size)].map((e, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="board-row">
            {[...Array(size)].map((f, j) => {
              return this.renderSquare(i, j);
            })}
          </div>
        ))}
      </div>
    );
  }
}

Board.propTypes = {
  boardSize: PropTypes.number.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Board;
