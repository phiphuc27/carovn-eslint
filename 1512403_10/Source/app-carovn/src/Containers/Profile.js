/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { setPasswordShow, setPhotoShow } from '../Actions';

export class Profile extends Component {
  render() {
    const {
      user,
      isPhotoModalShow,
      isPasswordModalShow,
      dispatch
    } = this.props;
    return (
      <div className="container">
        <h2>Profile</h2>
        <div className="form-container form-profile">
          <Form>
            <Form.Group
              as={Row}
              className="form-photo"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="5">
                Photo
              </Form.Label>
              <Col sm="4">
                <img src={user.avatarURL} alt="avatar" />
              </Col>
              <Col sm="3">
                <Button
                  block
                  type="button"
                  size="sm"
                  onClick={() => {
                    dispatch(setPhotoShow(true));
                  }}
                >
                  Change photo
                </Button>
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Email
              </Form.Label>
              <Col sm="8">
                <Form.Control plaintext readOnly value={user.email} />
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                First Name
              </Form.Label>
              <Col sm="8">
                <Form.Control plaintext readOnly value={user.first_name} />
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Last Name
              </Form.Label>
              <Col sm="8">
                <Form.Control plaintext readOnly value={user.last_name} />
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Birth Day
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  placeholderText="MM/dd/yyyy"
                  selected={user.birth_day}
                  dateFormat="MM/dd/yyyy"
                />
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Gender
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="select"
                  value={user.gender}
                  defaultValue="default"
                >
                  <option value="default">Select Your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Password
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue="email@example.com"
                  type="password"
                />
              </Col>
              <Col sm="3">
                <Button
                  block
                  type="button"
                  size="sm"
                  onClick={() => {
                    dispatch(setPasswordShow(true));
                  }}
                >
                  Change Password
                </Button>
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div>
          <Modal
            size="lg"
            centered
            show={isPasswordModalShow}
            onHide={() => {
              dispatch(setPasswordShow(false));
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Change Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="5">
                    Current Password:
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      placeholder="Enter your current password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="5">
                    New Password:
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      placeholder="Enter your new password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="5">
                    Confirm New Password:
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      placeholder="Confirm your password"
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  dispatch(setPasswordShow(false));
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(setPasswordShow(false));
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal
            centered
            show={isPhotoModalShow}
            onHide={() => {
              dispatch(setPhotoShow(false));
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Change Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  as={Row}
                  className="form-modal"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="5">
                    PhotoURL:
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control type="file" />
                  </Col>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  dispatch(setPhotoShow(false));
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(setPhotoShow(false));
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isPhotoModalShow: state.Profile.modalShow[1],
  isPasswordModalShow: state.Profile.modalShow[0],
  user: state.Login.user
});

export default connect(mapStateToProps)(Profile);
