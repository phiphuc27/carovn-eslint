const BOARD_SIZE = 20;

//= ================================FUNCTION============================================
function checkRow(playedSquare, board) {
  const { row, col } = playedSquare.position;
  const { value } = playedSquare;
  const winSquares = [];

  let i;

  const index = row * BOARD_SIZE + col;
  winSquares.push(index);
  for (i = 1; i < 5; i += 1) {
    const nextIndex = index + i * BOARD_SIZE;
    const prevIndex = index - i * BOARD_SIZE;
    if (board[nextIndex] === value && nextIndex % BOARD_SIZE === col) {
      winSquares.push(nextIndex);
    }

    if (board[prevIndex] === value && prevIndex % BOARD_SIZE === col) {
      winSquares.push(prevIndex);
    }
  }
  if (winSquares.length === 5) {
    const sort = winSquares.sort((a, b) => a - b);
    if (
      board[sort[0] - BOARD_SIZE] == null ||
      board[sort[4] + BOARD_SIZE] == null
    ) {
      return sort;
    }
  }
  return null;
}

function checkColumn(playedSquare, board) {
  const { row, col } = playedSquare.position;
  const { value } = playedSquare;
  const winSquares = [];
  let i;

  const index = row * BOARD_SIZE + col;
  winSquares.push(index);
  for (i = 1; i < 5; i += 1) {
    const nextIndex = index + i;
    const prevIndex = index - i;
    if (
      board[nextIndex] === value &&
      Math.floor(nextIndex / BOARD_SIZE) === row
    ) {
      winSquares.push(nextIndex);
    }

    if (
      board[prevIndex] === value &&
      Math.floor(prevIndex / BOARD_SIZE) === row
    ) {
      winSquares.push(prevIndex);
    }
  }
  if (winSquares.length === 5) {
    const sort = winSquares.sort((a, b) => a - b);
    if (board[sort[0] - 1] == null || board[sort[4] + 1] == null) {
      return sort;
    }
  }
  return null;
}

function checkDiagonal(playedSquare, board) {
  const { row, col } = playedSquare.position;
  const { value } = playedSquare;
  const winSquares = [];

  let i;

  const index = row * BOARD_SIZE + col;
  winSquares.push(index);
  for (i = 1; i < 5; i += 1) {
    const nextIndex = index + i + i * BOARD_SIZE;
    const prevIndex = index - i - i * BOARD_SIZE;
    if (board[nextIndex] === value && (nextIndex % BOARD_SIZE) - col === i) {
      winSquares.push(nextIndex);
    }
    if (board[prevIndex] === value && col - (prevIndex % BOARD_SIZE) === i) {
      winSquares.push(prevIndex);
    }
  }
  if (winSquares.length === 5) {
    const sort = winSquares.sort((a, b) => a - b);
    if (
      board[sort[0] - 1 - BOARD_SIZE] == null ||
      board[sort[4] + 1 + BOARD_SIZE] == null
    ) {
      return sort;
    }
  }

  return null;
}

function checkSecondDiagonal(playedSquare, board) {
  const { row, col } = playedSquare.position;
  const { value } = playedSquare;
  const winSquares = [];
  let i;
  const index = row * BOARD_SIZE + col;
  winSquares.push(index);
  for (i = 1; i < 5; i += 1) {
    const nextIndex = index + i - i * BOARD_SIZE;
    const prevIndex = index - i + i * BOARD_SIZE;
    if (board[nextIndex] === value && (nextIndex % BOARD_SIZE) - col === i) {
      winSquares.push(nextIndex);
    }
    if (board[prevIndex] === value && col - (prevIndex % BOARD_SIZE) === i) {
      winSquares.push(prevIndex);
    }
  }
  if (winSquares.length === 5) {
    const sort = winSquares.sort((a, b) => a - b);
    if (
      board[sort[4] - 1 + BOARD_SIZE] == null ||
      board[sort[0] + 1 - BOARD_SIZE] == null
    ) {
      return sort;
    }
  }
  return null;
}

function calculateWinner(playedSquares, board) {
  if (playedSquares.length === board.length) {
    return { name: 'draw' };
  }
  if (playedSquares.length > 0) {
    const playedSquare = playedSquares[playedSquares.length - 1];

    if (playedSquare !== null) {
      if (checkRow(playedSquare, board)) {
        return {
          name: playedSquare.value,
          moves: checkRow(playedSquare, board)
        };
      }
      if (checkColumn(playedSquare, board)) {
        return {
          name: playedSquare.value,
          moves: checkColumn(playedSquare, board)
        };
      }
      if (checkDiagonal(playedSquare, board)) {
        return {
          name: playedSquare.value,
          moves: checkDiagonal(playedSquare, board)
        };
      }
      if (checkSecondDiagonal(playedSquare, board)) {
        return {
          name: playedSquare.value,
          moves: checkSecondDiagonal(playedSquare, board)
        };
      }
    }
  }
  return null;
}

export default calculateWinner;
