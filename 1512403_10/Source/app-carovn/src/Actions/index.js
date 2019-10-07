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
