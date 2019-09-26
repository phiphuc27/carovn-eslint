import React from 'react';

export default function History(props) {
  const { history, isAscending, onChange, jumpTo } = props;
  const moves = history.map((step, move) => {
    const desc = move
      ? `${step.playedSquares[move - 1].value.toUpperCase()} move to (${step
          .playedSquares[move - 1].position.row + 1},
            ${step.playedSquares[move - 1].position.col + 1})`
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
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: '.5em'
        }}
      >
        <div className="status">Past Moves</div>
        <select
          onChange={onChange}
          style={{ padding: '.2em .4em', borderRadius: '5px' }}
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
