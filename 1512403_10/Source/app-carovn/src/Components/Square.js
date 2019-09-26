import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
function Square(props) {
	let icon;
	if (props.value === "x") {
		icon = <FontAwesomeIcon icon={faTimes} color='#4a94e8' />;
	} else if (props.value === "o") {
		icon = <FontAwesomeIcon icon={faCircle} color='#de3737' />;
	} else {
		icon = null;
	}
	const winner = props.winner ? `winner--${props.winner}` : "";
	const squareClass = `square ${winner}`;
	return (
		<button className={squareClass} onClick={() => props.onClick()}>
			{icon}
		</button>
	);
}

export default Square;
