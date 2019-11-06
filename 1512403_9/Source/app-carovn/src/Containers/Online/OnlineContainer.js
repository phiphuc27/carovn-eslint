import { connect } from 'react-redux';
import Game from '../../Components/Game/OnlineGame';
import {
  setRoomId,
  newGame,
  toggleCreateRoom,
  toggleJoinModal,
  togglePlayingStatus,
  setPlayer,
  setOpponent,
  clickSquareOnline,
  checkWinner
} from '../../Actions';

const mapStateToProps = state => ({
  user: state.Login.user,
  player: state.Online.player,
  isLoading: state.Login.fetching,
  isLoggedIn: state.Login.loggedIn,
  isJoinModal: state.Online.modal.isJoinModal,
  isPlaying: state.Online.isPlaying,
  isCreateRoom: state.Online.modal.isCreateRoom,
  endpoint: state.Online.endpoint,
  roomId: state.Online.roomId,
  undoMax: state.Board.undoMax
});

const mapDispatchToProps = dispatch => {
  return {
    setRoomId: id => {
      dispatch(setRoomId(id));
    },
    toggleJoinModal: () => {
      dispatch(toggleJoinModal);
    },
    togglePlayingStatus: () => {
      dispatch(togglePlayingStatus);
    },
    toggleCreateRoom: () => {
      dispatch(toggleCreateRoom);
    },
    createBoard: () => {
      dispatch(newGame);
    },
    setPlayer: name => {
      dispatch(setPlayer(name));
    },
    setOpponent: name => {
      dispatch(setOpponent(name));
    },
    clickSquareOnline: (index, player) => {
      dispatch(clickSquareOnline(index, player));
    },
    checkWinner: () => {
      dispatch(checkWinner);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
