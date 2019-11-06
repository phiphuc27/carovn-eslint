import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Input = (setMessage, sendMessage, messageInput) => {
  return (
    <div className="bottom_wrapper">
      <div className="message_input_wrapper">
        <Form.Control
          type="text"
          placeholder="Type your message..."
          onChange={e => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <Button onClick={() => sendMessage(messageInput)}>Send</Button>
    </div>
  );
};

export default Input;
