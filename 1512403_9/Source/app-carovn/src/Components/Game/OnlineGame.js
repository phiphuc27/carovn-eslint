import React, { Component } from 'react';
import { Modal, Button, Container, Row, Form, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import socket from '../../socket';

import OnlineBoard from '../../Containers/Online/VisibleOnlineBoard';
import OnlineInfo from '../../Containers/Online/VisibleOnlineInfo';
// eslint-disable-next-line import/no-named-as-default

export class OnlineGame extends Component {
  componentWillMount() {
    const {
      toggleCreateRoom,
      togglePlayingStatus,
      toggleJoinModal,
      createBoard,
      setRoomId,
      setPlayer,
      setOpponent,
      clickSquareOnline,
      checkWinner
    } = this.props;
    socket.on('newGame', ({ room }) => {
      setRoomId(room);
      toggleCreateRoom();
      createBoard();
    });
    socket.on('player1', ({ opponent }) => {
      setPlayer('x');
      toggleCreateRoom();
      togglePlayingStatus();
      setOpponent(opponent);
      socket.emit('sendInfoPlayer1', {
        user: this.user,
        roomId: this.roomId
      });
    });

    socket.on('player2', ({ opponent, room }) => {
      setPlayer('o');
      setRoomId(room);
      setOpponent(opponent);
      toggleJoinModal();
      togglePlayingStatus();
    });

    socket.on('turnPlayed', ({ square, player }) => {
      clickSquareOnline(square, player.name);
      checkWinner();
    });
  }

  handleCreateGame = e => {
    e.preventDefault();
    const { user, undoMax, player } = this.props;
    const userInfo = {
      name: `${user.first_name} ${user.last_name}`,
      avatar: user.avatarURL,
      undoMax,
      score: player.score
    };
    socket.emit('createGame', { user: userInfo });
  };

  handleJoinGame = e => {
    e.preventDefault();
    const { user, roomId, undoMax, player } = this.props;
    const userInfo = {
      name: `${user.first_name} ${user.last_name}`,
      avatar: user.avatarURL,
      undoMax,
      score: player.score
    };
    socket.emit('joinGame', { user: userInfo, roomId });
  };

  onClickSquare = i => {
    const { clickSquareOnline, checkWinner, player, roomId } = this.props;
    clickSquareOnline(i, player.name);
    checkWinner();
    socket.emit('playTurn', { square: i, roomId, player });
  };

  render() {
    const {
      isLoading,
      isLoggedIn,
      history,
      user,
      roomId,
      setRoomId,
      isCreateRoom,
      isJoinModal,
      isPlaying,
      toggleCreateRoom,
      toggleJoinModal
    } = this.props;
    return (
      <>
        {isLoading ? (
          <div
            style={{
              height: '86vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Spinner
              style={{ width: '100px', height: '100px' }}
              variant="dark"
              animation="border"
            />
          </div>
        ) : (
          <div>
            {isLoggedIn && !isCreateRoom && !isPlaying && (
              <Container>
                <Row>
                  <h2>Online Lobby</h2>
                </Row>
                <Row>
                  <div className="online-container">
                    <div className="online-player">
                      <img src={user.avatarURL} alt="avatar" />
                      <h4>
                        {user.first_name} {user.last_name}
                      </h4>
                    </div>
                    <div className="online-button-group">
                      <Button
                        size="lg"
                        block
                        variant="primary"
                        onClick={this.handleCreateGame}
                      >
                        Create new Game
                      </Button>
                      <Button
                        size="lg"
                        block
                        variant="success"
                        onClick={toggleJoinModal}
                      >
                        Join Games
                      </Button>
                    </div>
                  </div>
                </Row>
              </Container>
            )}
            {(isCreateRoom || isPlaying) && (
              <div className="game">
                <OnlineBoard onClickSquare={i => this.onClickSquare(i)} />
                {isPlaying && <OnlineInfo />}
              </div>
            )}
            <Modal
              centered
              show={!isLoggedIn}
              onHide={() => {
                history.push('/');
              }}
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body style={{ textAlign: 'center' }}>
                <h5>You need to log in before playing online!</h5>
              </Modal.Body>
              <Modal.Footer
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    history.push('/user/register');
                  }}
                  block
                >
                  Sign Up
                </Button>
                <h5>Or</h5>
                <Button
                  size="lg"
                  variant="danger"
                  onClick={() => {
                    history.push('/user/login');
                  }}
                  block
                >
                  Log In
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
        <Modal centered size="sm" show={isJoinModal} onHide={toggleJoinModal}>
          <Modal.Header closeButton>
            <Modal.Title>Join a game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Enter the room id"
              onChange={e => {
                setRoomId(e.target.value);
              }}
            />
          </Modal.Body>
          <Modal.Footer
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Button variant="secondary" onClick={toggleJoinModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleJoinGame}>
              Enter
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          centered
          show={isCreateRoom}
          onHide={toggleCreateRoom}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Create new game</Modal.Title>
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
                Share this room ID with your friends
              </p>
              <h1 style={{ color: '#FF0800' }}>
                <b>{roomId}</b>
              </h1>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Spinner animation="border" variant="dark" />
              <span
                style={{
                  fontSize: '1.2rem',
                  letterSpacing: '1.5px',
                  marginLeft: '10px'
                }}
              >
                Waiting for another player to join...
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block variant="secondary" onClick={toggleCreateRoom}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(OnlineGame);
