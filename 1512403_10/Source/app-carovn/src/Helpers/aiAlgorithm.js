import calculateWinner from './Helpers';

const huPlayer = 'x';
const computer = 'o';

const minimax = (squares, playedSquares, player, alpha, beta) => {
  const newSquares = [...squares];

  let currentSquares = [...playedSquares];
  if (calculateWinner(currentSquares, newSquares, huPlayer).moves) {
    return { score: -10 };
  }
  if (calculateWinner(currentSquares, newSquares, computer).moves) {
    return { score: 10 };
  }
  if (currentSquares.length === newSquares.length) {
    return { score: 0 };
  }

  const moves = [];

  for (let i = 0; i < newSquares.length; i += 1) {
    if (newSquares[i] === null) {
      const move = {};
      move.index = i;
      newSquares[i] = player;

      currentSquares = [
        ...currentSquares,
        {
          id: i,
          position: {
            row: Math.floor(i / 20),
            col: i % 20
          },
          value: player
        }
      ];

      if (player === computer) {
        const result = minimax(newSquares, currentSquares, huPlayer);
        move.score = result.score;
      } else {
        const result = minimax(newSquares, currentSquares, computer);
        move.score = result.score;
      }

      newSquares[i] = move.index;
      console.log(move);

      moves.push(move);
    }
  }

  let bestMove;
  if (player === computer) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i += 1) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i += 1) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
};

const getBestSquare = (squares, playedSquares) => {
  return minimax(squares, playedSquares, computer);
};

export default getBestSquare;
