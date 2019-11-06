const defaultState = {
  isAscending: true
};
const gameInfo = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_SORT':
      return {
        ...state,
        isAscending: !state.isAscending
      };
    default:
      return state;
  }
};

export default gameInfo;
