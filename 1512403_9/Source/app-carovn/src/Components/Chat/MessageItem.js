import React from 'react';

export default function MessageItem({ user, message, info }) {
  return (
    <div>
      <li className={user ? 'message right' : 'message left'}>
        <div className="avatar">
          <img src={info.avatar} alt="user" />
        </div>
        <div className="text_wrapper">
          <div className="box bg-light-info">{message}</div>
        </div>
      </li>
    </div>
  );
}
