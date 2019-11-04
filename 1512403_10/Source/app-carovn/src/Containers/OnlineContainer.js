import { connect } from 'react-redux';
import Game from '../Components/Game/OnlineGame';
import {
  setRoomId,
  toggleCreateRoom,
  toggleCreateModal,
  toggleJoinModal,
  togglePlayingStatus
} from '../Actions';

const mapStateToProps = state => ({
  user: state.Login.user,
  isLoading: state.Login.fetching,
  isLoggedIn: state.Login.loggedIn,
  isJoinModal: state.Online.isJoinModal,
  isCreateModal: state.Online.isCreateModal,
  isPlaying: state.Online.isPlaying,
  isCreateRoom: state.Online.isCreateRoom,
  endpoint: state.Online.endpoint,
  roomId: state.Online.roomId
});

const mapDispatchToProps = dispatch => {
  return {
    setRoomId: id => {
      dispatch(setRoomId(id));
    },
    toggleCreateModal: () => {
      dispatch(toggleCreateModal);
    },
    toggleJoinModal: () => {
      dispatch(toggleJoinModal);
    },
    togglePlayingStatus: () => {
      dispatch(togglePlayingStatus);
    },
    toggleCreateRoom: () => {
      dispatch(toggleCreateRoom);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
