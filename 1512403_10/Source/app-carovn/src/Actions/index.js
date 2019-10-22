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

export const successLogin = (token, user) => ({
  type: 'LOGIN_SUCCESS',
  token,
  user
});

export const errorLogin = error => ({
  type: 'LOGIN_ERROR',
  error
});

export const getLoginUser = token => {
  return dispatch => {
    axios({
      method: 'get',
      url: 'https://radiant-hamlet-02403.herokuapp.com/me',
      data: token,
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        dispatch(successLogin(token, response.data));
      })
      .catch(err => {
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
/* end of login */

export const logout = {
  type: 'LOG_OUT'
};
