import calculateWinner from '../Helpers/Helpers';
import getBestSquare from '../Helpers/aiAlgorithm';
/* eslint-disable default-case */
const defaultState = {
  squares: [],
  bestSquare: 0,
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
  const player = 'x';
  const computer = 'o';
  const { history, squares, stepNumber } = state;
  const tmpHistory = history.slice(0, stepNumber + 1);
  const current = tmpHistory[tmpHistory.length - 1];
  const tmpSquares = squares.slice();
  const stepHistory = history[action.step];
  const newSquares = Array(20 * 20).fill(null);
  const checkXWinner = calculateWinner(
    current.playedSquares,
    tmpSquares,
    player
  );
  const checkOWinner = calculateWinner(
    current.playedSquares,
    tmpSquares,
    computer
  );
  let tmpBestSquare;
  let lastStepSquare;
  let currentSquares = current.playedSquares;

  switch (action.type) {
    case 'NEW_GAME':
      resetRadioBtn();
      return {
        ...state,
        ...{
          squares: Array(20 * 20).fill(null),
          bestSquare: 0,
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
      if (squares[action.index] || checkXWinner.name) {
        return state;
      }
      squares[action.index] = player;
      currentSquares = [
        ...currentSquares,
        {
          id: action.index,
          position: {
            row: Math.floor(action.index / 20),
            col: action.index % 20
          },
          value: squares[action.index]
        }
      ];

      if (checkXWinner.name !== 'draw') {
        tmpBestSquare = getBestSquare(squares, currentSquares);

        squares[tmpBestSquare] = computer;
        currentSquares = [
          ...currentSquares,
          {
            id: tmpBestSquare,
            position: {
              row: Math.floor(tmpBestSquare / 20),
              col: tmpBestSquare % 20
            },
            value: squares[tmpBestSquare]
          }
        ];
      }
      return {
        ...state,
        ...{
          history: [
            ...tmpHistory,
            {
              playedSquares: [...currentSquares]
            }
          ],
          stepNumber: tmpHistory.length,
          squares,
          bestSquare: tmpBestSquare
        }
      };
    case 'JUMP_TO':
      for (let i = 0; i < stepHistory.playedSquares.length; i += 1) {
        const curSquare = stepHistory.playedSquares[i];
        const index = curSquare.position.row * 20 + curSquare.position.col;
        newSquares[index] = curSquare.value;
      }
      lastStepSquare =
        stepHistory.playedSquares[stepHistory.playedSquares.length - 1];
      return {
        ...state,
        ...{
          squares: newSquares,
          stepNumber: action.step,
          winner:
            lastStepSquare.value === 'x'
              ? calculateWinner(stepHistory.playedSquares, newSquares, player)
              : calculateWinner(stepHistory.playedSquares, newSquares, computer)
        }
      };
    case 'CHECK_WINNER':
      if (checkXWinner.name) return { ...state, winner: checkXWinner };
      return { ...state, winner: checkOWinner };
    default:
      return { ...state, squares: Array(20 * 20).fill(null) };
  }
};

export default board;
