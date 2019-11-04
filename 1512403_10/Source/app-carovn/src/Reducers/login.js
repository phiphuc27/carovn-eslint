const loginState = {
  input: {
    email: '',
    password: ''
  },
  fetching: false,
  loggedIn: false,
  error: '',
  user: ''
};

const accountManagement = (state = loginState, action) => {
  switch (action.type) {
    case 'USER_CHANGE': {
      return {
        ...state,
        user: { ...state.user, [action.name]: action.value }
      };
    }

    case 'INPUT_CHANGE': {
      return {
        ...state,
        input: { ...state.input, [action.name]: action.value }
      };
    }

    case 'LOGIN_START': {
      return {
        ...state,
        input: {
          email: '',
          password: ''
        },
        fetching: true,
        loggedIn: false,
        error: ''
      };
    }

    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        fetching: false,
        loggedIn: true,
        error: null,
        user: action.user
      };
    }

    case 'LOGIN_ERROR': {
      return {
        ...state,
        fetching: false,
        loggedIn: false,
        error: action.error
      };
    }

    case 'RESET_TOKEN': {
      return {
        ...state,
        user: '',
        error: '',
        fetching: false
      };
    }
    default:
      return state;
  }
};

export default accountManagement;
