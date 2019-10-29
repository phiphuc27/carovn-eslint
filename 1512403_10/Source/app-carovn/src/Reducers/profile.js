const profileState = {
  input: {
    avatarURL: '',
    email: '',
    first_name: '',
    last_name: '',
    birth_day: '',
    gender: '',
    password: ''
  },
  modalShow: Array(2).fill(false),
  fetching: false,
  fetched: false,
  error: ''
};

const accountProfile = (state = profileState, action) => {
  switch (action.type) {
    case 'SET_PASSWORD_SHOW': {
      return {
        ...state,
        modalShow: [action.value, false]
      };
    }
    case 'SET_PHOTO_SHOW': {
      return {
        ...state,
        modalShow: [false, action.value]
      };
    }
    case 'REGISTER_START': {
      return {
        ...state,
        input: {
          name: '',
          email: '',
          password: '',
          repeat_password: ''
        },
        fetching: true,
        fetched: false,
        error: ''
      };
    }
    case 'REGISTER_SUCCESS': {
      return { ...state, fetching: false, fetched: true };
    }
    case 'REGISTER_ERROR': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }

    default:
      return state;
  }
};

export default accountProfile;
