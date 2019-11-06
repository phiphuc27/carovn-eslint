import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setChatMessage, addChatMessage } from '../../Actions';
import socket from '../../socket';
import MessageList from '../../Components/Chat/MessageList';
import MessageInput from '../../Components/Chat/Input';

export class ChatContainer extends Component {
  componentWillMount() {
    socket.on('getNewMessage', message => {
      this.newMessage(message);
    });
  }

  render() {
    const { chatMessageList, message, player, setMessage } = this.props;
    return (
      <div className="chat-container">
        <MessageList messages={chatMessageList} user={player} />
        <MessageInput
          messageInput={message}
          setMessage={msg => setMessage(msg)}
          sendMessage={msg => this.sendMessage(msg)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatMessageList: state.Online.chatMessageList,
  message: state.Online.chatMessage,
  user: state.Login.user,
  player: state.Online.player
});

const mapDispatchToProps = dispatch => {
  return {
    setMessage: msg => {
      dispatch(setChatMessage(msg));
    },
    addMessage: msg => {
      dispatch(addChatMessage(msg));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer);
