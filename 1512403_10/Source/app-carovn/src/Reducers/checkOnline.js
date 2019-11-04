const defaultState = {
  endpoint: 'localhost:5000',
  isPlaying: false,
  isCreateRoom: false,
  isCreateModal: false,
  isJoinModal: false,
  roomId: null
};
const checkOnline = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_ROOM': {
      return { ...state, roomId: action.id };
    }
    case 'TOGGLE_CREATE_MODAL': {
      return { ...state, isCreateModal: !state.isCreateModal };
    }
    case 'TOGGLE_JOIN_MODAL': {
      return { ...state, isJoinModal: !state.isJoinModal };
    }
    case 'TOGGLE_PLAYING': {
      return { ...state, isPlaying: !state.isPlaying };
    }
    case 'TOGGLE_CREATE_ROOM': {
      return { ...state, isCreateRoom: !state.isCreateRoom };
    }
    default:
      return state;
  }
};

export default checkOnline;
