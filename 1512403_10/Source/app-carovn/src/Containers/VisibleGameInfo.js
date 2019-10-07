import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toggleSort, newGame, jumpTo } from '../Actions';
import History from '../Components/History';

export class VisibleGameInfo extends Component {
  getStatus = () => {
    const { winner, xIsNext } = this.props;
    let icon;
    let status;
    if ((xIsNext && winner.name === '') || winner.name === 'x') {
      icon = <FontAwesomeIcon icon={faTimes} color="#4a94e8" size="lg" />;
    } else if ((!xIsNext && winner.name === '') || winner.name === 'o') {
      icon = <FontAwesomeIcon icon={faCircle} color="#de3737" size="lg" />;
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
      <p>
        {status} {icon}
      </p>
    );
  };

  render() {
    const { history, isAscending, dispatch } = this.props;
    const status = this.getStatus();
    return (
      <div className="game-info">
        <div style={{ margin: '0 0 2em 10px' }}>
          <div style={{ position: 'relative', marginBottom: '.6em' }}>
            <button
              type="button"
              className="btn"
              onClick={() => {
                dispatch(newGame);
              }}
            >
              New Game
            </button>
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
  winner: state.Board.winner
});

export default connect(mapStateToProps)(VisibleGameInfo);
