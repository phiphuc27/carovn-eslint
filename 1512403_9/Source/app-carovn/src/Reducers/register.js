const registerState = {
  input: {
    email: '',
    password: '',
    repeat_password: ''
  },
  fetching: false,
  fetched: false,
  error: ''
};

const accountRegister = (state = registerState, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      return {
        ...state,
        input: { ...state.input, [action.name]: action.value }
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

export default accountRegister;
