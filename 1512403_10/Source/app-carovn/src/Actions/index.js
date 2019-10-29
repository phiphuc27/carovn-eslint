/* eslint-disable no-undef */
import axios from 'axios';
/* eslint-disable import/prefer-default-export */
export const clickSquare = index => ({
  type: 'CLICK_SQUARE',
  index
});

export const jumpTo = step => ({
  type: 'JUMP_TO',
  step
});

export const checkWinner = {
  type: 'CHECK_WINNER'
};

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
      googleID: data.El,
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
      googleID: data.El,
      email: data.profileObj.email,
      familyName: data.profileObj.familyName,
      givenName: data.profileObj.givenName,
      photoURL: data.profileObj.imageUrl
    };
    await axios({
      method: 'get',
      url: 'https://radiant-hamlet-02403.herokuapp.com/auth/facebook',
      data: userData
    })
      .then(response => {
        console.log(response);
        window.sessionStorage.setItem('jwtToken', response.data.token);
        dispatch(getLoginUser(response.data.token));
      })
      .catch(err => {
        dispatch(errorLogin(err.response.data));
      });
  };
};
/* end of login */

export const logout = {
  type: 'LOG_OUT'
};

export const setPasswordShow = value => ({
  type: 'SET_PASSWORD_SHOW',
  value
});

export const setPhotoShow = value => ({
  type: 'SET_PHOTO_SHOW',
  value
});
