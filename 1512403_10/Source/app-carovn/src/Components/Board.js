import React, { Component } from "react";
import Square from "./Square";

export class Board extends Component {
	renderSquare(row, col) {
		const winner = this.props.winner;
		let i = row * this.props.boardSize + col;
		return (
			<Square
				key={[row, col]}
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
				winner={winner && winner.moves.includes(i) ? winner.name : ""}
			/>
		);
	}

	render() {
		const size = this.props.boardSize;
		return (
			<div>
				{[...Array(size)].map((e, i) => (
					<div key={i} className='board-row'>
						{[...Array(size)].map((e, j) => {
							return this.renderSquare(i, j);
						})}
					</div>
				))}
			</div>
		);
	}
}

export default Board;
