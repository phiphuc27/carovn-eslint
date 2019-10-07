import calculateWinner from '../Helpers/Helpers';
/* eslint-disable default-case */
const defaultState = {
  squares: Array(20 * 20).fill(null),
  history: [
    {
      playedSquares: []
    }
  ],
  stepNumber: 0,
  xIsNext: true,
  winner: {
    name: '',
    moves: null
  }
};

const resetRadioBtn = () => {
  document.querySelectorAll('input[type=radio]').forEach(element => {
    if (element.checked) {
      const tmp = element;
      tmp.checked = false;
    }
  });
};

const board = (state = defaultState, action) => {
  const { history, squares, xIsNext, stepNumber } = state;
  const tmpHistory = history.slice(0, stepNumber + 1);
  const current = tmpHistory[tmpHistory.length - 1];
  const tmpSquares = squares.slice();
  const stepHistory = history[action.step];
  const newSquares = Array(20 * 20).fill(null);
  const checkWinner = calculateWinner(current.playedSquares, tmpSquares);
  switch (action.type) {
    case 'NEW_GAME':
      resetRadioBtn();
      return {
        ...state,
        ...{
          squares: Array(20 * 20).fill(null),
          history: [
            {
              playedSquares: []
            }
          ],
          stepNumber: 0,
          xIsNext: true,
          winner: {
            name: '',
            moves: null
          }
        }
      };
    case 'CLICK_SQUARE':
      if (squares[action.index] || checkWinner.name) {
        return state;
      }
      squares[action.index] = xIsNext ? 'x' : 'o';
      return {
        ...state,
        ...{
          history: [
            ...tmpHistory,
            {
              playedSquares: [
                ...current.playedSquares,
                {
                  id: action.index,
                  position: {
                    row: Math.floor(action.index / 20),
                    col: action.index % 20
                  },
                  value: squares[action.index]
                }
              ]
            }
          ],
          stepNumber: tmpHistory.length,
          xIsNext: !xIsNext,
          squares
        }
      };
    case 'JUMP_TO':
      for (let i = 0; i < stepHistory.playedSquares.length; i += 1) {
        const curSquare = stepHistory.playedSquares[i];
        const index = curSquare.position.row * 20 + curSquare.position.col;
        newSquares[index] = curSquare.value;
      }
      return {
        ...state,
        ...{
          squares: newSquares,
          stepNumber: action.step,
          xIsNext: action.step % 2 === 0,
          winner: calculateWinner(stepHistory.playedSquares, newSquares)
        }
      };
    case 'CHECK_WINNER':
      return { ...state, winner: checkWinner };
    default:
      return state;
  }
};

export default board;
