import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

function Square({ value, winner, onClick }) {
  let icon;
  if (value === 'x') {
    icon = <FontAwesomeIcon icon={faTimes} color="#4a94e8" />;
  } else if (value === 'o') {
    icon = <FontAwesomeIcon icon={faCircle} color="#de3737" />;
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
