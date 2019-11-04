import React, { Component } from 'react';
import { Modal, Button, Container, Row, Form, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import shortid from 'shortid';
// eslint-disable-next-line import/no-named-as-default

export class OnlineGame extends Component {
  componentWillMount() {
    const { endpoint } = this.props;
    const socket = io(endpoint);
  }

  render() {
    const {
      isLoading,
      isLoggedIn,
      history,
      user,
      roomId,
      setRoomId,
      isCreateModal,
      isJoinModal,
      isCreateRoom,
      toggleCreateModal,
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
            {isLoggedIn && !isCreateRoom && (
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
                        onClick={toggleCreateModal}
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
            <Button variant="primary">Enter</Button>
          </Modal.Footer>
        </Modal>
        <Modal centered show={isCreateModal} onHide={toggleCreateModal}>
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
                Your room ID is
              </p>
              <h1 style={{ color: '#FF0800' }}>
                <b>{shortid.generate()}</b>
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
            <Button block variant="secondary" onClick={toggleCreateModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(OnlineGame);
