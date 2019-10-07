import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import calculateWinner from '../Helpers/Helpers';
import './App.css';
// eslint-disable-next-line import/no-named-as-default
import Board from './Board';
import History from './History';

const BOARD_SIZE = 20;

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
      history: [
        {
          playedSquares: []
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isAscending: true
    };
  }

  onClick(i) {
    this.resetRadioBtn();
  }

  resetRadioBtn = () => {
    document.querySelectorAll('input[type=radio]').forEach(element => {
      if (element.checked) {
        const tmp = element;
        tmp.checked = false;
      }
    });
  };

  newGame = () => {
    this.resetRadioBtn();
    this.setState({
      squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
      history: [
        {
          playedSquares: []
        }
      ],
      stepNumber: 0,
      xIsNext: true
    });
  };

  jumpTo(step) {
    const { history } = this.state;
    const current = history[step];
    const newSquares = Array(BOARD_SIZE * BOARD_SIZE).fill(null);
    for (let i = 0; i < current.playedSquares.length; i += 1) {
      const curSquare = current.playedSquares[i];
      const index =
        curSquare.position.row * BOARD_SIZE + curSquare.position.col;
      newSquares[index] = curSquare.value;
    }
    this.setState({
      squares: newSquares,
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const { history, stepNumber, squares, isAscending, xIsNext } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.playedSquares, squares);

    let status;

    if (winner === null) {
      status = 'Next player: ';
    } else {
      if (winner.name !== 'draw') {
        status = 'Winner: ';
      }
      if (winner.name === 'draw') {
        status = 'Draw!';
      }
    }

    let icon;
    if (
      (xIsNext && winner === null) ||
      (winner !== null && winner.name === 'x')
    ) {
      icon = <FontAwesomeIcon icon={faTimes} color="#4a94e8" size="lg" />;
    } else if (
      (!xIsNext && winner === null) ||
      (winner !== null && winner.name === 'o')
    ) {
      icon = <FontAwesomeIcon icon={faCircle} color="#de3737" size="lg" />;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            boardSize={BOARD_SIZE}
            squares={squares}
            onClick={i => this.onClick(i)}
            winner={winner}
          />
        </div>
        <div className="game-info">
          <div style={{ margin: '0 0 2em 10px' }}>
            <div style={{ position: 'relative', marginBottom: '.6em' }}>
              <button type="button" className="btn" onClick={this.newGame}>
                New Game
              </button>
            </div>
            <div className="status">
              {status} {icon}
            </div>
          </div>
          <History
            history={history}
            isAscending={isAscending}
            jumpTo={move => this.jumpTo(move)}
            onChange={() => {
              this.setState({ isAscending: !isAscending });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Game;
