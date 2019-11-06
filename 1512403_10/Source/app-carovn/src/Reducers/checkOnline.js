const defaultState = {
  endpoint: 'localhost:5000',
  player: {
    name: null,
    score: 0
  },
  opponent: {
    name: null,
    avatar: null,
    undoMax: 2,
    score: 0
  },
  isPlaying: false,
  modal: {
    isCreateRoom: false,
    isJoinModal: false,
    isSurrenderModal: false,
    isDrawModal: false,
    isNewGameModal: false
  },
  chatMessage: null,
  chatMessageList: [
    {
      id: 0,
      user: {
        name: null,
        avatar: null,
        player: null
      },
      message: null
    }
  ],
  answerMessage: null,
  roomId: null
};
const checkOnline = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_ROOM': {
      return { ...state, roomId: action.id };
    }
    case 'TOGGLE_JOIN_MODAL': {
      return {
        ...state,
        modal: { ...state.modal, isJoinModal: !state.modal.isJoinModal }
      };
    }

    case 'TOGGLE_CREATE_ROOM': {
      return {
        ...state,
        modal: { ...state.modal, isCreateRoom: !state.modal.isCreateRoom }
      };
    }

    case 'TOGGLE_SURRENDER_MODAL': {
      return {
        ...state,
        modal: {
          ...state.modal,
          isSurrenderModal: !state.modal.isSurrenderModal
        }
      };
    }

    case 'TOGGLE_DRAW_MODAL': {
      return {
        ...state,
        modal: { ...state.modal, isDrawModal: !state.modal.isDrawModal }
      };
    }

    case 'TOGGLE_NEW_GAME_MODAL': {
      return {
        ...state,
        modal: { ...state.modal, isNewGameModal: !state.modal.isNewGameModal }
      };
    }

    case 'TOGGLE_PLAYING': {
      return { ...state, isPlaying: !state.isPlaying };
    }

    case 'SET_PLAYER': {
      return {
        ...state,
        player: { ...state.player, name: action.name }
      };
    }

    case 'SET_OPPONENT': {
      return {
        ...state,
        opponent: action.name
      };
    }

    case 'SET_MESSAGE': {
      return {
        ...state,
        answerMessage: action.message
      };
    }

    case 'SET_CHAT_MESSAGE': {
      return {
        ...state,
        chatMessage: action.message
      };
    }

    case 'ADD_CHAT_MESSAGE': {
      return {
        ...state,
        chatMessageList: [...state.chatMessageList, action.message]
      };
    }

    case 'INCREASE_SCORE': {
      return {
        ...state,
        player: { ...state.player, score: action.score }
      };
    }
    case 'REDUCE_OPPONENT_UNDO': {
      return {
        ...state,
        opponent: { ...state.opponent, undoMax: action.num }
      };
    }
    default:
      return state;
  }
};

export default checkOnline;
