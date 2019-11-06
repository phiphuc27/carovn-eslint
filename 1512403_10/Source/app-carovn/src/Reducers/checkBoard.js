import calculateWinner from '../Helpers/Helpers';
import getBestSquare from '../Helpers/aiAlgorithm';
/* eslint-disable default-case */
const defaultState = {
  squares: [],
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
  },
  undoMax: 2
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
  let checkWinner;
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
      if (squares[action.index] || checkXWinner.name || checkOWinner.name) {
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
        tmpBestSquare = getBestSquare(squares);

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
    case 'CLICK_SQUARE_ONLINE':
      if (squares[action.index] || checkXWinner.name || checkOWinner.name) {
        return state;
      }
      if (
        (action.player === 'x' && !state.xIsNext) ||
        (action.player === 'o' && state.xIsNext)
      ) {
        return state;
      }
      squares[action.index] = action.player;
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
          xIsNext: !state.xIsNext,
          squares
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
      if (action.step > 0) {
        checkWinner =
          lastStepSquare.value === 'x'
            ? calculateWinner(stepHistory.playedSquares, newSquares, player)
            : calculateWinner(stepHistory.playedSquares, newSquares, computer);
      } else checkWinner = { name: '', moves: null };
      return {
        ...state,
        ...{
          squares: newSquares,
          stepNumber: action.step,
          xIsNext: action.step % 2 === 0,
          winner: checkWinner
        }
      };

    case 'REDUCE_NUM_UNDO': {
      return { ...state, undoMax: state.undoMax - 1 };
    }

    case 'REDUCE_OPPONENT_UNDO': {
      return state;
    }

    case 'CHECK_WINNER': {
      if (checkXWinner.name) return { ...state, winner: checkXWinner };
      return { ...state, winner: checkOWinner };
    }

    case 'SET_WINNER': {
      return { ...state, winner: { ...state.winner, name: action.name } };
    }
    default:
      return { ...state, squares: Array(20 * 20).fill(null) };
  }
};

export default board;
