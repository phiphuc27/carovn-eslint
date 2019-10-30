const profileState = {
  modalShow: Array(2).fill(false),
  editable: false,
  fetching: false,
  fetched: false,
  passwordInput: {
    current_password: '',
    new_password: '',
    confirm_password: ''
  },
  error: {
    password: '',
    profile: '',
    photo: ''
  }
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
    case 'PASSWORD_CHANGE': {
      return {
        ...state,
        passwordInput: { ...state.passwordInput, [action.name]: action.value }
      };
    }
    case 'EDIT_TOGGLE': {
      return {
        ...state,
        editable: action.value
      };
    }

    case 'EDIT_START': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: {
          password: '',
          profile: '',
          photo: ''
        }
      };
    }

    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: {
          password: '',
          profile: '',
          photo: ''
        },
        editable: false,
        modalShow: [false, false]
      };
    }

    case 'EDIT_PROFILE_ERROR': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: { ...state.error, profile: action.error }
      };
    }

    case 'EDIT_PASSWORD_ERROR': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: { ...state.error, password: action.error }
      };
    }

    case 'EDIT_PHOTO_ERROR': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: { ...state.error, photo: action.error }
      };
    }

    default:
      return state;
  }
};

export default accountProfile;
