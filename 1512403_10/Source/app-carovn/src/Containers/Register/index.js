import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { register, inputChange } from '../../Actions';

export class Register extends Component {
  handleEvent(event, data) {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(register(data));
  }

  render() {
    const { isFetching, isFetched, error, input, dispatch } = this.props;
    return (
      <div className="container">
        <h2>Create new account</h2>
        <div className="form-container">
          {error && <p style={{ color: 'red' }}>{error} *</p>}
          <Form onSubmit={e => this.handleEvent(e, input)}>
            <Form.Group controlId="formBasicName">
              <Form.Label>
                User name <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="name"
                onChange={e =>
                  dispatch(inputChange(e.target.name, e.target.value))
                }
              />
              <Form.Text className="text-muted">
                User name must have 3-30 characters
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                Email address <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={e =>
                  dispatch(inputChange(e.target.name, e.target.value))
                }
              />
              <Form.Text className="text-muted">
                We{`'`}ll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>
                Password <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={e =>
                  dispatch(inputChange(e.target.name, e.target.value))
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicRepeatPassword">
              <Form.Label>
                Confirm password <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="repeat_password"
                onChange={e =>
                  dispatch(inputChange(e.target.name, e.target.value))
                }
              />
            </Form.Group>
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
                  Sign Up
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
                  Register Success!
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
  input: state.Register.input,
  isFetching: state.Register.fetching,
  isFetched: state.Register.fetched,
  error: state.Register.error
});

export default connect(mapStateToProps)(Register);
