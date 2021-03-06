import React from 'react';
import PropTypes from 'prop-types';

function History({ history, isAscending, onChange, jumpTo }) {
  const moves = history.map((step,move) => {
    const xMove = step.playedSquares.length;
    const desc = move
      ? `${step.playedSquares[xMove - 2].value.toUpperCase()} move to (${step
          .playedSquares[xMove - 2].position.row + 1},
            ${step.playedSquares[xMove - 2].position.col + 1})`
      : 'Go to game start';
    return (
      // eslint-disable-next-line react/no-array-index-key
      <li key={move} style={{ marginTop: '1.2em', position: 'relative' }}>
        <input
          className="radio"
          type="radio"
          name="history"
          id={move}
          onClick={() => jumpTo(move)}
        />
        <label className="radio--label" htmlFor={move}>
          {desc}
        </label>
      </li>
    );
  });
  const sortMoves = isAscending
    ? moves.sort((a, b) => a.key - b.key)
    : moves.sort((a, b) => b.key - a.key);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          marginBottom: '.5em'
        }}
      >
        <div className="status">Past Moves</div>
        <select
          onChange={onChange}
          style={{
            padding: '.2em .4em',
            borderRadius: '5px',
            marginLeft: '10px'
          }}
        >
          <option value="0">Ascending</option>
          <option value="1">Descending</option>
        </select>
      </div>
      <ol style={{ overflow: 'auto', height: '70vh', width: '200px' }}>
        {sortMoves}
      </ol>
    </div>
  );
}

History.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      playedSquares: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
  ).isRequired,
  isAscending: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  jumpTo: PropTypes.func.isRequired
};

export default History;
