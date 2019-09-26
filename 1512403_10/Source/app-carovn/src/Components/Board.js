import React, { Component } from 'react';
import Square from './Square';

export class Board extends Component {
  renderSquare(row, col) {
    const { winner, boardSize, squares, onClick } = this.props;
    const i = row * boardSize + col;
    return (
      <Square
        key={[row, col]}
        value={squares[i]}
        onClick={() => onClick(i)}
        winner={winner && winner.moves.includes(i) ? winner.name : ''}
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
export default Board;
