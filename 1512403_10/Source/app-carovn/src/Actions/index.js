/* eslint-disable no-undef */
import axios from 'axios';

export const clickSquare = index => ({
  type: 'CLICK_SQUARE',
  index
});

export const checkWinner = {
  type: 'CHECK_WINNER'
};

export const jumpTo = step => ({
  type: 'JUMP_TO',
  step
});

export const newGame = {
  type: 'NEW_GAME'
};

export const toggleSort = {
  type: 'TOGGLE_SORT'
};

/* Register */
export const inputChange = (name, value) => ({
  type: 'INPUT_CHANGE',
  name,
  value
});

export const startRegister = {
  type: 'REGISTER_START'
};

export const successRegister = {
  type: 'REGISTER_SUCCESS'
};

export const errorRegister = error => ({
  type: 'REGISTER_ERROR',
  error
});

export const register = data => {
  return dispatch => {
    dispatch(startRegister);
    axios({
      method: 'post',
      url: 'https://radiant-hamlet-02403.herokuapp.com/user/register',
      data
    })
      .then(() => {
        dispatch(successRegister);
      })
      .catch(err => {
        dispatch(errorRegister(err.response.data));
      });
  };
};

/* end of register */

/* Login */
export const startLogin = {
  type: 'LOGIN_START'
};

export const successLogin = user => ({
  type: 'LOGIN_SUCCESS',
  user
});

export const errorLogin = error => ({
  type: 'LOGIN_ERROR',
  error
});

export function resetToken() {
  return {
    type: RESET_TOKEN
  };
}

export const getLoginUser = token => {
  return dispatch => {
    dispatch(startLogin);
    axios({
      method: 'get',
      url: 'https://radiant-hamlet-02403.herokuapp.com/me',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        window.sessionStorage.setItem('jwtToken', response.data.token);
        dispatch(successLogin(response.data.user));
      })
      .catch(err => {
        window.sessionStorage.removeItem('jwtToken');
        dispatch(errorLogin(err.response.data));
      });
  };
};

export const login = data => {
  return async dispatch => {
    await dispatch(startLogin);
    await axios({
      method: 'post',
      url: 'https://radiant-hamlet-02403.herokuapp.com/user/login',
      data
    })
      .then(response => {
        dispatch(getLoginUser(response.data.token));
      })
      .catch(err => {
        dispatch(errorLogin(err.response.data));
      });
  };
};

export const googleLogin = data => {
  return async dispatch => {
    await dispatch(startLogin);
    const userData = {
      googleId: data.El,
      email: data.profileObj.email,
      familyName: data.profileObj.familyName,
      givenName: data.profileObj.givenName,
      photoURL: data.profileObj.imageUrl
    };
    const request = await axios({
      method: 'post',
      url: 'https://radiant-hamlet-02403.herokuapp.com/user/google',
      data: userData
    });
    return {
      type: 'SIGN_UP',
      payload: request
    };
  };
};

export const facebookLogin = data => {
  return async dispatch => {
    await dispatch(startLogin);
    const userData = {
      email: data.email,
      name: data.name,
      photoURL: data.picture.data.url
    };
    const request = await axios({
      method: 'post',
      url: 'https://radiant-hamlet-02403.herokuapp.com/user/facebook',
      data: userData
    });
    return {
      type: 'SIGN_UP',
      payload: request
    };
  };
};
/* end of login */

export const logout = {
  type: 'LOG_OUT'
};

/* Profile */
export const userChange = (name, value) => ({
  type: 'USER_CHANGE',
  name,
  value
});

export const passwordChange = (name, value) => ({
  type: 'PASSWORD_CHANGE',
  name,
  value
});

export const setPasswordShow = value => ({
  type: 'SET_PASSWORD_SHOW',
  value
});

export const setPhotoShow = value => ({
  type: 'SET_PHOTO_SHOW',
  value
});

export const editToggle = value => ({
  type: 'EDIT_TOGGLE',
  value
});

export const startEdit = {
  type: 'EDIT_START'
};

export const successEdit = {
  type: 'EDIT_SUCCESS'
};

export const errorProfileEdit = error => ({
  type: 'EDIT_PROFILE_ERROR',
  error
});

export const errorPasswordEdit = error => ({
  type: 'EDIT_PASSWORD_ERROR',
  error
});

export const errorPhotoEdit = error => ({
  type: 'EDIT_PHOTO_ERROR',
  error
});

export const editProfile = profile => {
  return dispatch => {
    dispatch(startEdit);
    const token = window.sessionStorage.getItem('jwtToken');
    const userProfile = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      gender: profile.gender,
      birth_day: profile.birth_day
    };
    axios({
      method: 'post',
      url: 'https://radiant-hamlet-02403.herokuapp.com/user/profile',
      data: userProfile,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async response => {
        if (response.statusText === 'OK') {
          await dispatch(successEdit);
          setTimeout(() => {
            dispatch(getLoginUser(token));
          }, 2000);
        }
      })
      .catch(err => {
        dispatch(errorProfileEdit(err));
      });
  };
};

export const editPassword = password => {
  return dispatch => {
    dispatch(startEdit);
    const token = window.sessionStorage.getItem('jwtToken');
    axios({
      method: 'post',
      url:
        'https://radiant-hamlet-02403.herokuapp.com/user/profile/changePassword',
      data: password,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async response => {
        if (response.statusText === 'OK') {
          await dispatch(successEdit);
          setTimeout(() => {
            dispatch(getLoginUser(token));
          }, 2000);
        }
      })
      .catch(err => {
        dispatch(errorPasswordEdit(err.response.data));
      });
  };
};

export const editPhoto = data => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');
    await axios({
      method: 'post',
      url:
        'https://radiant-hamlet-02403.herokuapp.com/user/profile/changePhoto',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async response => {
        if (response.statusText === 'OK') {
          await dispatch(successEdit);
          setTimeout(() => {
            dispatch(getLoginUser(token));
          }, 2000);
        }
      })
      .catch(err => {
        dispatch(errorPhotoEdit(err.response.data));
      });
  };
};

export const uploadPhoto = photo => {
  return async dispatch => {
    dispatch(startEdit);
    await axios
      .post(
        'https://us-central1-carovn-v2.cloudfunctions.net/uploadFile',
        photo
      )
      .then(response => {
        dispatch(editPhoto(response.data));
      })
      .catch(err => {
        dispatch(errorPhotoEdit(err));
      });
  };
};
/* end of profile */

/* Online Action */

export const setRoomId = id => ({
  type: 'SET_ROOM',
  id
});

export const toggleJoinModal = {
  type: 'TOGGLE_JOIN_MODAL'
};

export const toggleCreateRoom = {
  type: 'TOGGLE_CREATE_ROOM'
};

export const toggleSurrenderModal = {
  type: 'TOGGLE_SURRENDER_MODAL'
};

export const toggleDrawModal = {
  type: 'TOGGLE_DRAW_MODAL'
};

export const toggleNewGameModal = {
  type: 'TOGGLE_NEW_GAME_MODAL'
};

export const togglePlayingStatus = {
  type: 'TOGGLE_PLAYING'
};

export const setPlayer = name => ({
  type: 'SET_PLAYER',
  name
});

export const setOpponent = name => ({
  type: 'SET_OPPONENT',
  name
});

export const setMessage = message => ({
  type: 'SET_MESSAGE',
  message
});

export const setChatMessage = message => ({
  type: 'SET_CHAT_MESSAGE',
  message
});

export const addChatMessage = message => ({
  type: 'ADD_CHAT_MESSAGE',
  message
});

export const setWinner = name => ({
  type: 'SET_WINNER',
  name
});

export const reduceUndo = {
  type: 'REDUCE_NUM_UNDO'
};

export const reduceOpponentUndo = num => ({
  type: 'REDUCE_OPPONENT_UNDO',
  num
});

export const clickSquareOnline = (index, player) => ({
  type: 'CLICK_SQUARE_ONLINE',
  index,
  player
});

export const increaseScore = score => ({
  type: 'INCREASE_SCORE',
  score
});

/* end of online action */
