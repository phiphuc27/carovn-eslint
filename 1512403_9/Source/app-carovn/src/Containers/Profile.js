/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Row, Button, Modal, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
  setPasswordShow,
  setPhotoShow,
  editToggle,
  editProfile,
  editPassword,
  uploadPhoto,
  userChange,
  passwordChange
} from '../Actions';
import FileUpload from '../Components/FileUploadModal';

export class Profile extends Component {
  handleDateChange = date => {
    const { dispatch } = this.props;
    dispatch(userChange('birth_day', date));
  };

  handleSubmit = (e, user) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(editProfile(user));
  };

  handlePasswordChange = (e, password) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(editPassword(password));
  };

  handlePhotoChange = (e, file) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadPhoto(formData));
  };

  render() {
    const {
      user,
      error,
      editable,
      isPhotoModalShow,
      isPasswordModalShow,
      fetching,
      isLoading,
      fetched,
      passwordInput,
      dispatch
    } = this.props;
    const genderText = user.gender
      ? user.gender.slice(0, 1).toUpperCase() +
        user.gender.slice(1, user.gender.length)
      : '';
    const isDisable = editable ? 'disabled' : '';
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
          <div className="container">
            <h2>Profile</h2>
            <div className="form-container form-profile">
              {error.profile && (
                <p style={{ color: 'red' }}>{error.profile} *</p>
              )}
              <Form onSubmit={e => this.handleSubmit(e, user)}>
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
                      className={isDisable}
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
                    <h5>{user.email}</h5>
                  </Col>
                </Form.Group>
                <hr />
                <Form.Group as={Row} controlId="formPlaintextFirstName">
                  <Form.Label column sm="4">
                    First Name
                  </Form.Label>
                  <Col sm="8">
                    {editable ? (
                      <Form.Control
                        name="first_name"
                        type="text"
                        value={user.first_name}
                        onChange={e => {
                          dispatch(userChange(e.target.name, e.target.value));
                        }}
                      />
                    ) : (
                      <h5>{user.first_name}</h5>
                    )}
                  </Col>
                </Form.Group>
                <hr />
                <Form.Group as={Row} controlId="formPlaintextLastName">
                  <Form.Label column sm="4">
                    Last Name
                  </Form.Label>
                  <Col sm="8">
                    {editable ? (
                      <Form.Control
                        name="last_name"
                        type="text"
                        value={user.last_name}
                        onChange={e => {
                          dispatch(userChange(e.target.name, e.target.value));
                        }}
                      />
                    ) : (
                      <h5>{user.last_name}</h5>
                    )}
                  </Col>
                </Form.Group>
                <hr />
                <Form.Group as={Row} controlId="formPlaintextBirthDay">
                  <Form.Label column sm="4">
                    Birth Day
                  </Form.Label>
                  <Col sm="8">
                    {editable ? (
                      <DatePicker
                        name="birth_day"
                        locale="en"
                        placeholderText="dd/MM/yyyy"
                        dateFormat="dd/MM/yyyy"
                        selected={
                          user.birth_day
                            ? moment(user.birth_day).toDate()
                            : moment().toDate()
                        }
                        onChange={this.handleDateChange}
                      />
                    ) : (
                      <h5>{moment(user.birth_day).format('DD/MM/YYYY')}</h5>
                    )}
                  </Col>
                </Form.Group>
                <hr />
                <Form.Group as={Row} controlId="formPlaintextGender">
                  <Form.Label column sm="4">
                    Gender
                  </Form.Label>
                  <Col sm="8">
                    {editable ? (
                      <Form.Control
                        as="select"
                        value={user.gender ? user.gender : 'default'}
                        onChange={e => {
                          dispatch(userChange('gender', e.target.value));
                        }}
                      >
                        <option value="default">Select Your Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Control>
                    ) : (
                      <h5>{genderText}</h5>
                    )}
                  </Col>
                </Form.Group>
                <hr />
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="4">
                    Password
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      plaintext
                      readOnly
                      value={user.password ? user.password : ''}
                      type="password"
                    />
                  </Col>
                  <Col sm="3">
                    <Button
                      block
                      className={isDisable}
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

                {editable ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      style={{ marginRight: '10px' }}
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        dispatch(editToggle(false));
                      }}
                    >
                      Cancel
                    </Button>
                    {fetching ? (
                      <Button
                        className="disabled"
                        variant="primary"
                        style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Spinner
                          animation="border"
                          variant="light"
                          size="sm"
                          style={{ marginRight: '10px' }}
                        />
                        Loading...
                      </Button>
                    ) : (
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    )}
                    {fetched && (
                      <p
                        style={{
                          color: 'green',
                          fontWeight: 'bold',
                          marginLeft: '10px',
                          fontSize: '1.2rem'
                        }}
                      >
                        Edit profile success!
                      </p>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => {
                      dispatch(editToggle(true));
                    }}
                  >
                    Edit
                  </Button>
                )}
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
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {error.password && (
                    <p style={{ color: 'red' }}>{error.password} *</p>
                  )}
                  <Form>
                    {user.password && (
                      <Form.Group as={Row} controlId="formOldPassword">
                        <Form.Label column sm="5">
                          Current Password:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            type="password"
                            name="old_password"
                            value={passwordInput.old_password}
                            onChange={e => {
                              dispatch(
                                passwordChange(e.target.name, e.target.value)
                              );
                            }}
                            placeholder="Enter your current password"
                          />
                        </Col>
                      </Form.Group>
                    )}
                    <Form.Group as={Row} controlId="formNewPassword">
                      <Form.Label column sm="5">
                        New Password:
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          type="password"
                          name="new_password"
                          value={passwordInput.new_password}
                          onChange={e => {
                            dispatch(
                              passwordChange(e.target.name, e.target.value)
                            );
                          }}
                          placeholder="Enter your new password"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formConfirmPassword">
                      <Form.Label column sm="5">
                        Confirm New Password:
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          type="password"
                          name="confirm_password"
                          value={passwordInput.confirm_password}
                          onChange={e => {
                            dispatch(
                              passwordChange(e.target.name, e.target.value)
                            );
                          }}
                          placeholder="Confirm your password"
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  {fetched && (
                    <p
                      style={{
                        color: 'green',
                        fontWeight: 'bold',
                        marginLeft: '10px',
                        fontSize: '1.2rem'
                      }}
                    >
                      Edit photo success!
                    </p>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => {
                      dispatch(setPasswordShow(false));
                    }}
                  >
                    Cancel
                  </Button>
                  {fetching ? (
                    <Button
                      className="disabled"
                      variant="primary"
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Spinner
                        animation="border"
                        variant="light"
                        size="sm"
                        style={{ marginRight: '10px' }}
                      />
                      Loading...
                    </Button>
                  ) : (
                    <Button variant="primary" type="submit">
                      Save Change
                    </Button>
                  )}
                </Modal.Footer>
              </Modal>
            </div>
            <FileUpload
              show={isPhotoModalShow}
              isFetching={fetching}
              isFetched={fetched}
              error={error}
              onHide={() => {
                dispatch(setPhotoShow(false));
              }}
              onSubmit={(e, file) => this.handlePhotoChange(e, file)}
            />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isPhotoModalShow: state.Profile.modalShow[1],
  isPasswordModalShow: state.Profile.modalShow[0],
  user: state.Login.user,
  isLoading: state.Login.fetching,
  fetching: state.Profile.fetching,
  editable: state.Profile.editable,
  fetched: state.Profile.fetched,
  error: state.Profile.error,
  passwordInput: state.Profile.passwordInput
});

export default connect(mapStateToProps)(Profile);
