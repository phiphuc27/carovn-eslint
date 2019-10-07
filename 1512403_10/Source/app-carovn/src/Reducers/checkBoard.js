/* eslint-disable default-case */
const defaultState = {
  squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
  history: [
    {
      playedSquares: []
    }
  ],
  stepNumber: 0,
  xIsNext: true,
  isAscending: true
};
const board = (state = defaultState, action) => {
  const { history, squares, xIsNext, stepNumber } = state;
  const tmpHistory = history.slice(0, stepNumber + 1);
  const current = tmpHistory[tmpHistory.length - 1];
  const tmpSquares = squares.slice();
  const winner = calculateWinner(current.playedSquares, tmpSquares);
  switch (action.type) {
    case 'CLICK_SQUARE':
      if (squares[action.index] || winner) {
        return;
      }
      squares[action.index] = xIsNext ? 'x' : 'o';
      this.setState({
        history: [
          ...tmpHistory,
          {
            playedSquares: [
              ...current.playedSquares,
              {
                id: action.index,
                position: {
                  row: Math.floor(action.index / BOARD_SIZE),
                  col: action.index % BOARD_SIZE
                },
                value: squares[action.index]
              }
            ]
          }
        ],
        stepNumber: tmpHistory.length,
        xIsNext: !xIsNext,
        squares
      });
  }
};
