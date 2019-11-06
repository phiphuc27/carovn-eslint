import React from 'react';
import PropTypes from 'prop-types';
import { FiX, FiCircle } from 'react-icons/fi';

function Square({ value, winner, onClick }) {
  let icon;
  if (value === 'x') {
    icon = <FiX style={{ color: '#de3737' }} />;
  } else if (value === 'o') {
    icon = <FiCircle style={{ color: '#4a94e8' }} />;
  } else {
    icon = null;
  }
  const winnerName = winner ? `winner--${winner}` : '';
  const squareClass = `square ${winnerName}`;
  return (
    <button type="button" className={squareClass} onClick={() => onClick()}>
      {icon}
    </button>
  );
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Square;
