import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FiX, FiCircle } from 'react-icons/fi';
import { Modal, Button } from 'react-bootstrap';
import {
  jumpTo,
  reduceUndo,
  reduceOpponentUndo,
  toggleDrawModal,
  toggleSurrenderModal,
  setWinner,
  setMessage
} from '../../Actions';
import socket from '../../socket';

export class VisibleOnlineInfo extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    socket.on('opponentUndo', ({ stepNumber, opponentUndo }) => {
      dispatch(jumpTo(stepNumber - 1));
      dispatch(reduceOpponentUndo(opponentUndo - 1));
    });

    socket.on('getSurrenderAns', ({ message, winner }) => {
      const newMessage = `player ${message} is surrendered. You win`;
      dispatch(setMessage(newMessage));
      dispatch(setWinner(winner));
    });

    socket.on('getSuggestions', ({ modal }) => {
      if (modal === 'draw') {
        dispatch(toggleDrawModal);
      }
    });

    socket.on('getAcceptAns', ({ modal, message }) => {
      if (modal === 'draw') {
        const newMessage = `player ${message} accepted to draw this match. Game Draw!`;
        dispatch(setMessage(newMessage));
        dispatch(setWinner('draw'));
      }
    });

    socket.on('getDeclineAns', ({ modal, message }) => {
      if (modal === 'draw') {
        const newMessage = `player ${message} declined to draw this match. Game Continue!`;
        dispatch(setMessage(newMessage));
      }
    });
  }

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

  undo = () => {
    const { dispatch, stepNumber, roomId, undoMax } = this.props;
    socket.emit('undo', { roomId, stepNumber, opponentUndo: undoMax });
    dispatch(jumpTo(stepNumber - 1));
    dispatch(reduceUndo);
  };

  render() {
    const {
      dispatch,
      roomId,
      stepNumber,
      undoMax,
      player,
      user,
      xIsNext,
      opponent,
      modal,
      winner
    } = this.props;
    const status = this.getStatus();
    return (
      <>
        <div className="game-info">
          <div style={{ marginBottom: '1em' }}>
            <div
              style={{
                marginBottom: '.6em',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                type="button"
                className={
                  winner.name === ''
                    ? 'btn btn-newgame'
                    : 'btn btn-newgame disabled'
                }
                onClick={() => {
                  dispatch(toggleSurrenderModal);
                }}
              >
                Surrender
              </button>
              <button
                type="button"
                className={
                  winner.name === ''
                    ? 'btn btn-newgame'
                    : 'btn btn-newgame disabled'
                }
                onClick={() => {
                  socket.emit('sendSuggestions', { modal: 'draw', roomId });
                }}
              >
                Draw
              </button>

              <button
                type="button"
                className={
                  stepNumber > 0 &&
                  undoMax > 0 &&
                  ((player.name === 'x' && !xIsNext) ||
                    (player.name === 'o' && xIsNext))
                    ? 'btn btn-newgame'
                    : 'btn btn-newgame disabled'
                }
                onClick={this.undo}
              >
                Undo
              </button>
            </div>
            <div className="status">{status}</div>
          </div>
          <div className="users-info">
            <div className="user-info">
              <p>
                Undo left: <b>{undoMax}</b>
              </p>
              {player.name === 'x' ? (
                <FiX
                  style={{
                    color: '#de3737',
                    fontSize: '1.5em',
                    marginLeft: '10px'
                  }}
                />
              ) : (
                <FiCircle
                  style={{
                    color: '#4a94e8',
                    fontSize: '1.5em',
                    marginLeft: '10px'
                  }}
                />
              )}
              <img src={user.avatarURL} alt="playerAvatar" />

              <b>
                {user.first_name} {user.last_name}
              </b>
              {/* <span>{player.score}</span> */}
            </div>
            <span>VS</span>
            {opponent && (
              <div className="user-info">
                <p>
                  Undo left: <b>{opponent.undoMax}</b>
                </p>
                {player.name === 'x' ? (
                  <FiCircle
                    style={{
                      color: '#4a94e8',
                      fontSize: '1.5em',
                      marginLeft: '10px'
                    }}
                  />
                ) : (
                  <FiX
                    style={{
                      color: '#de3737',
                      fontSize: '1.5em',
                      marginLeft: '10px'
                    }}
                  />
                )}
                <img src={opponent.avatar} alt="playerAvatar" />

                <b>{opponent.name}</b>

                {/* <span>{opponent.score}</span> */}
              </div>
            )}
          </div>
        </div>
        <Modal
          centered
          show={modal.isSurrenderModal}
          onHide={() => dispatch(toggleSurrenderModal)}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Surrender</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '1.2em'
              }}
            >
              <p style={{ textAlign: 'center', marginBottom: '10px' }}>
                Are you sure you want to surrender the game ? You will lose a
                point.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              variant="secondary"
              onClick={() => dispatch(toggleSurrenderModal)}
            >
              Cancel
            </Button>
            <Button
              block
              variant="danger"
              onClick={() => {
                dispatch(setWinner(player.name === 'x' ? 'o' : 'x'));
                socket.emit('sendSurrenderAns', {
                  message: `${user.first_name} ${user.last_name}`,
                  winner: player.name === 'x' ? 'o' : 'x',
                  roomId
                });
                dispatch(toggleSurrenderModal);
              }}
            >
              Surrender
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          centered
          show={modal.isDrawModal}
          onHide={() => dispatch(toggleDrawModal)}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Draw</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '1.2em'
              }}
            >
              <p style={{ textAlign: 'center', marginBottom: '10px' }}>
                <b>{opponent.name}</b> want to draw this game. Do you accept?
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              variant="secondary"
              onClick={() => {
                socket.emit('sendSuggestAns', {
                  modal: 'draw',
                  roomId,
                  message: `${user.first_name} ${user.last_name}`,
                  answer: false
                });
                dispatch(toggleDrawModal);
              }}
            >
              Cancel
            </Button>
            <Button
              block
              variant="danger"
              onClick={() => {
                dispatch(setWinner('draw'));
                socket.emit('sendSuggestAns', {
                  modal: 'draw',
                  roomId,
                  message: `${user.first_name} ${user.last_name}`,
                  answer: true
                });
                dispatch(toggleDrawModal);
              }}
            >
              Accept
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  roomId: state.Online.roomId,
  xIsNext: state.Board.xIsNext,
  winner: state.Board.winner,
  stepNumber: state.Board.stepNumber,
  undoMax: state.Board.undoMax,
  user: state.Login.user,
  opponent: state.Online.opponent,
  player: state.Online.player,
  modal: state.Online.modal
});

export default connect(mapStateToProps)(VisibleOnlineInfo);
