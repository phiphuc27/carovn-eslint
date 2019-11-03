//= ================================FUNCTION============================================
function checkRow(playedSquare, board) {
  const { row, col } = playedSquare.position;
  const { value } = playedSquare;
  const winSquares = [];

  let i;

  const index = row * 20 + col;
  winSquares.push(index);
  for (i = 1; i < 5; i += 1) {
    const nextIndex = index + i * 20;
    const prevIndex = index - i * 20;
    if (board[nextIndex] === value && nextIndex % 20 === col) {
      winSquares.push(nextIndex);
    }

    if (board[prevIndex] === value && prevIndex % 20 === col) {
      winSquares.push(prevIndex);
    }
  }
  if (winSquares.length === 5) {
    const sort = winSquares.sort((a, b) => a - b);
    if (board[sort[0] - 20] == null || board[sort[4] + 20] == null) {
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

  const index = row * 20 + col;
  winSquares.push(index);
  for (i = 1; i < 5; i += 1) {
    const nextIndex = index + i;
    const prevIndex = index - i;
    if (board[nextIndex] === value && Math.floor(nextIndex / 20) === row) {
      winSquares.push(nextIndex);
    }

    if (board[prevIndex] === value && Math.floor(prevIndex / 20) === row) {
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

  const index = row * 20 + col;
  winSquares.push(index);
  for (i = 1; i < 5; i += 1) {
    const nextIndex = index + i + i * 20;
    const prevIndex = index - i - i * 20;
    if (board[nextIndex] === value && (nextIndex % 20) - col === i) {
      winSquares.push(nextIndex);
    }
    if (board[prevIndex] === value && col - (prevIndex % 20) === i) {
      winSquares.push(prevIndex);
    }
  }
  if (winSquares.length === 5) {
    const sort = winSquares.sort((a, b) => a - b);
    if (board[sort[0] - 1 - 20] == null || board[sort[4] + 1 + 20] == null) {
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
  const index = row * 20 + col;
  winSquares.push(index);
  for (i = 1; i < 5; i += 1) {
    const nextIndex = index + i - i * 20;
    const prevIndex = index - i + i * 20;
    if (board[nextIndex] === value && (nextIndex % 20) - col === i) {
      winSquares.push(nextIndex);
    }
    if (board[prevIndex] === value && col - (prevIndex % 20) === i) {
      winSquares.push(prevIndex);
    }
  }
  if (winSquares.length === 5) {
    const sort = winSquares.sort((a, b) => a - b);
    if (board[sort[4] - 1 + 20] == null || board[sort[0] + 1 - 20] == null) {
      return sort;
    }
  }
  return null;
}

function calculateWinner(playedSquares, board, player) {
  if (playedSquares.length === board.length) {
    return { name: 'draw', moves: null };
  }
  console.log(playedSquares, board, player);
  const playerSquares = playedSquares.filter(square => square.value === player);
  if (playerSquares.length > 0) {
    const playedSquare = playerSquares[playerSquares.length - 1];
    if (playedSquare !== null) {
      if (checkRow(playedSquare, board)) {
        return {
          name: player,
          moves: checkRow(playedSquare, board)
        };
      }
      if (checkColumn(playedSquare, board)) {
        return {
          name: player,
          moves: checkColumn(playedSquare, board)
        };
      }
      if (checkDiagonal(playedSquare, board)) {
        return {
          name: player,
          moves: checkDiagonal(playedSquare, board)
        };
      }
      if (checkSecondDiagonal(playedSquare, board)) {
        return {
          name: player,
          moves: checkSecondDiagonal(playedSquare, board)
        };
      }
    }
  }
  return { name: '', moves: null };
}

export default calculateWinner;
