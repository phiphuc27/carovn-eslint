import React, { Component } from "react";
import "./App.css";
import Board from "./Components/Board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const BOARD_SIZE = 20;

export class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
	}

	jumpTo(step) {
		const history = this.state.history;
		const current = history[step];
		const newSquares = Array(BOARD_SIZE * BOARD_SIZE).fill(null);
		for (let i = 0; i < current.playedSquares.length; i++) {
			const curSquare = current.playedSquares[i];
			const index =
				curSquare.position.row * BOARD_SIZE + curSquare.position.col;
			newSquares[index] = curSquare.value;
		}
		this.setState({
			squares: newSquares,
			stepNumber: step,
			xIsNext: step % 2 === 0
		});
	}

	resetRadioBtn() {
		document.querySelectorAll("input[type=radio]").forEach(element => {
			if (element.checked) {
				element.checked = false;
			}
		});
	}

	onClick(i) {
		this.resetRadioBtn();
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = this.state.squares.slice();
		const winner = calculateWinner(current.playedSquares, squares);
		if (squares[i] || winner) {
			return;
		}
		squares[i] = this.state.xIsNext ? "x" : "o";
		const newSquare = {
			position: {
				row: Math.floor(i / BOARD_SIZE),
				col: i % BOARD_SIZE
			},
			value: squares[i]
		};
		this.setState({
			history: [
				...history,
				{
					playedSquares: [...current.playedSquares, newSquare]
				}
			],
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
			squares: squares
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.playedSquares, this.state.squares);

		const moves = history.map((step, move) => {
			const desc = move
				? `${step.playedSquares[move - 1].value.toUpperCase()} move to (${step
						.playedSquares[move - 1].position.row + 1},
          ${step.playedSquares[move - 1].position.col + 1})`
				: "Go to game start";
			return (
				<li key={move} style={{ marginTop: "1.2em", position: "relative" }}>
					<input
						className='radio'
						type='radio'
						name='history'
						id={move}
						onClick={() => this.jumpTo(move)}
					/>
					<label className='radio--label' htmlFor={move}>
						{desc}
					</label>
				</li>
			);
		});
		const sortMoves = this.state.isAscending
			? moves.sort((a, b) => a.key - b.key)
			: moves.sort((a, b) => b.key - a.key);

		let status;
		if (winner === null) {
			status = "Next player: ";
		} else {
			if (winner.name !== "draw") {
				status = "Winner: ";
			}
			if (winner.name === "draw") {
				status = "Draw!";
			}
		}

		let icon;
		if (
			(this.state.xIsNext && winner === null) ||
			(winner !== null && winner.name === "x")
		) {
			icon = <FontAwesomeIcon icon={faTimes} color='#4a94e8' size='lg' />;
		} else if (
			(!this.state.xIsNext && winner === null) ||
			(winner !== null && winner.name === "o")
		) {
			icon = <FontAwesomeIcon icon={faCircle} color='#de3737' size='lg' />;
		}

		return (
			<div className='game'>
				<div className='game-board'>
					<Board
						boardSize={BOARD_SIZE}
						squares={this.state.squares}
						onClick={i => this.onClick(i)}
						winner={winner}
					/>
				</div>
				<div className='game-info'>
					<div
						style={{
							display: "flex",
							margin: "0 0 2em 10px",
							flexDirection: "column"
						}}>
						<div
							style={{ flex: "1", position: "relative", marginBottom: ".6em" }}>
							<button
								className='btn'
								onClick={() => {
									this.resetRadioBtn();
									this.setState({
										squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
										history: [
											{
												playedSquares: []
											}
										],
										stepNumber: 0,
										xIsNext: true
									});
								}}>
								New Game
							</button>
						</div>
						<div className='status'>
							{status} {icon}
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-around",
							marginBottom: ".5em"
						}}>
						<div className='status'>Past Moves</div>
						<select
							onChange={() => {
								this.setState({ isAscending: !this.state.isAscending });
							}}
							style={{ padding: ".2em .4em", borderRadius: "5px" }}>
							<option value='0'>Ascending</option>
							<option value='1'>Descending</option>
						</select>
					</div>
					<ol style={{ overflow: "auto", height: "70vh", width: "200px" }}>
						{sortMoves}
					</ol>
				</div>
			</div>
		);
	}
}

export default Game;

//=================================FUNCTION============================================

function checkRow(playedSquare, board) {
	const curRow = playedSquare.position.row;
	const curCol = playedSquare.position.col;
	const value = playedSquare.value;
	let winSquares = [];

	let i;

	const index = curRow * BOARD_SIZE + curCol;
	winSquares.push(index);
	for (i = 1; i < 5; i++) {
		const nextIndex = index + i * BOARD_SIZE;
		const prevIndex = index - i * BOARD_SIZE;
		if (board[nextIndex] === value && nextIndex % BOARD_SIZE === curCol) {
			winSquares.push(nextIndex);
		}

		if (board[prevIndex] === value && prevIndex % BOARD_SIZE === curCol) {
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
	const curRow = playedSquare.position.row;
	const curCol = playedSquare.position.col;
	const value = playedSquare.value;
	let winSquares = [];
	let i;

	const index = curRow * BOARD_SIZE + curCol;
	winSquares.push(index);
	for (i = 1; i < 5; i++) {
		const nextIndex = index + i;
		const prevIndex = index - i;
		if (
			board[nextIndex] === value &&
			Math.floor(nextIndex / BOARD_SIZE) === curRow
		) {
			winSquares.push(nextIndex);
		}

		if (
			board[prevIndex] === value &&
			Math.floor(prevIndex / BOARD_SIZE) === curRow
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
	const curRow = playedSquare.position.row;
	const curCol = playedSquare.position.col;
	const value = playedSquare.value;
	let winSquares = [];

	let i;

	const index = curRow * BOARD_SIZE + curCol;
	winSquares.push(index);
	for (i = 1; i < 5; i++) {
		const nextIndex = index + i + i * BOARD_SIZE;
		const prevIndex = index - i - i * BOARD_SIZE;
		if (board[nextIndex] === value && (nextIndex % BOARD_SIZE) - curCol === i) {
			winSquares.push(nextIndex);
		}
		if (board[prevIndex] === value && curCol - (prevIndex % BOARD_SIZE) === i) {
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
	const curRow = playedSquare.position.row;
	const curCol = playedSquare.position.col;
	const value = playedSquare.value;
	let winSquares = [];
	let i;
	const index = curRow * BOARD_SIZE + curCol;
	winSquares.push(index);
	for (i = 1; i < 5; i++) {
		const nextIndex = index + i - i * BOARD_SIZE;
		const prevIndex = index - i + i * BOARD_SIZE;
		if (board[nextIndex] === value && (nextIndex % BOARD_SIZE) - curCol === i) {
			winSquares.push(nextIndex);
		}
		if (board[prevIndex] === value && curCol - (prevIndex % BOARD_SIZE) === i) {
			winSquares.push(prevIndex);
		}
	}
	if (winSquares.length === 5) {
		const sort = winSquares.sort((a, b) => a - b);
		if (
			board[sort[0] - 1 + BOARD_SIZE] == null ||
			board[sort[4] + 1 - BOARD_SIZE] == null
		) {
			return sort;
		}
	}
	return null;
}

function calculateWinner(playedSquares, board) {
	if (playedSquares.length === board.length) {
		return { name: "draw" };
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
