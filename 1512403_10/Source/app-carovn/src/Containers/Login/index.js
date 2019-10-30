import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {
  login,
  inputChange,
  googleLogin,
  errorLogin,
  getLoginUser
} from '../../Actions';

export class Login extends Component {
  responseGoogle = response => {
    const { dispatch } = this.props;
    dispatch(googleLogin(response)).then(res => {
      const { payload } = res;
      const { data, status } = payload;
      const { token } = data;
      if (status !== 200) {
        dispatch(errorLogin(payload));
      } else {
        window.sessionStorage.setItem('jwtToken', token);
      }
      dispatch(getLoginUser(token));
    });
  };

  responseFacebook = response => {
    console.log(response);
  };

  handleEvent(event, data) {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(login(data));
  }

  render() {
    const { isFetching, isFetched, error, input, dispatch } = this.props;
    return (
      <div className="container">
        <h2>Log In</h2>
        <div className="form-container">
          {error && <p style={{ color: 'red' }}>{error} *</p>}
          <Form onSubmit={e => this.handleEvent(e, input)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={e =>
                  dispatch(inputChange(e.target.name, e.target.value))
                }
                value={input.email}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={e =>
                  dispatch(inputChange(e.target.name, e.target.value))
                }
                value={input.password}
              />
            </Form.Group>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px 0'
              }}
            >
              <GoogleLogin
                clientId="652654063583-rnnfk9bpiv5sf5b72td6k4e0s0dlvjh5.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy="single_host_origin"
              />
              <FacebookLogin
                appId="536717120424233"
                autoLoad={false}
                fields="id,name,email,picture"
                callback={this.responseFacebook}
                icon="fa-facebook"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              {isFetching ? (
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
                  Log In
                </Button>
              )}
              {isFetched && (
                <p
                  style={{
                    color: 'green',
                    fontWeight: 'bold',
                    marginLeft: '10px',
                    fontSize: '1.2rem'
                  }}
                >
                  You are logged in !
                </p>
              )}
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  input: state.Login.input,
  isFetching: state.Login.fetching,
  isFetched: state.Login.fetched,
  error: state.Login.error
});

export default connect(mapStateToProps)(Login);
