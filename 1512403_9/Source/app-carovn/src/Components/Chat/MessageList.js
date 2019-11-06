import React from 'react';
import Message from './MessageItem';

export default function MessageList({ messages, user }) {
  return (
    <div>
      <ul className="messages">
        {messages.map(item => (
          <Message
            key={item.id}
            user={item.user.player === user.name}
            info={item.user}
            message={item.message}
          />
        ))}
      </ul>
    </div>
  );
}
