import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Register() {
  return (
    <div className="container">
      <h2>Create new account</h2>
      <div className="form-container">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              User name <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="name"
            />
            <Form.Text className="text-muted">
              User name must have 3-30 characters
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Email address <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
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
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              Confirm password <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="repeat_password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}
