const loginState = {
  input: {
    email: '',
    password: ''
  },
  fetching: false,
  fetched: false,
  error: '',
  token: '',
  user: ''
};

const accountManagement = (state = loginState, action) => {
  switch (action.type) {
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
        fetched: false,
        error: ''
      };
    }

    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        token: action.token,
        user: action.user
      };
    }

    case 'LOGIN_ERROR': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }

    default:
      return state;
  }
};

export default accountManagement;
