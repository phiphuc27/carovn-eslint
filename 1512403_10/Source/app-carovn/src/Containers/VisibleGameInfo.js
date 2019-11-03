import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FiX, FiCircle } from 'react-icons/fi';
import { toggleSort, newGame, jumpTo } from '../Actions';
import History from '../Components/Game/History';

export class VisibleGameInfo extends Component {
  getStatus = () => {
    const { winner, xIsNext } = this.props;
    let icon;
    let status;
    if ((xIsNext && winner.name === '') || winner.name === 'x') {
      icon = (
        <FiX
          style={{ color: '#de3737', fontSize: '1.5em', marginLeft: '10px' }}
        />
      );
    } else if ((!xIsNext && winner.name === '') || winner.name === 'o') {
      icon = (
        <FiCircle
          style={{ color: '#4a94e8', fontSize: '1.5em', marginLeft: '10px' }}
        />
      );
    }
    if (winner.name === '') {
      status = 'Next player: ';
    } else {
      if (winner.name !== 'draw') {
        status = 'Winner: ';
      }
      if (winner.name === 'draw') {
        status = 'Draw!';
      }
    }
    return (
      <p
        style={{
          display: 'flex',
          alignItems: 'flex-end'
        }}
      >
        {status} {icon}
      </p>
    );
  };

  render() {
    const { history, isAscending, dispatch, stepNumber } = this.props;
    const status = this.getStatus();
    return (
      <div className="game-info">
        <div style={{ marginBottom: '1em' }}>
          <div style={{ marginBottom: '.6em' }}>
            <button
              type="button"
              className="btn btn-newgame"
              onClick={() => {
                dispatch(newGame);
              }}
            >
              New Game
            </button>
            <div>
              <button
                type="button"
                className={
                  stepNumber > 0
                    ? 'btn btn-newgame'
                    : 'btn btn-newgame disabled'
                }
                onClick={() => {
                  dispatch(jumpTo(stepNumber - 1));
                }}
              >
                Undo
              </button>
              <button
                type="button"
                className={
                  stepNumber < history.length - 1
                    ? 'btn btn-newgame'
                    : 'btn btn-newgame disabled'
                }
                onClick={() => {
                  dispatch(jumpTo(stepNumber + 1));
                }}
              >
                Redo
              </button>
            </div>
          </div>
          <div className="status">{status}</div>
        </div>
        <History
          history={history}
          isAscending={isAscending}
          jumpTo={move => dispatch(jumpTo(move))}
          onChange={() => {
            dispatch(toggleSort);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  history: state.Board.history,
  isAscending: state.GameInfo.isAscending,
  xIsNext: state.Board.xIsNext,
  winner: state.Board.winner,
  stepNumber: state.Board.stepNumber
});

export default connect(mapStateToProps)(VisibleGameInfo);
