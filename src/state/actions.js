import { ActionCreators } from 'redux-undo';

export const START_GAME = 'START_GAME';
export const REDUCE_NUMBER = 'REDUCE_NUMBER';
export const NEW_GAME = 'NEW_GAME';

export const startGame = maxNumber => ({
	type: START_GAME,
	payload: {
		maxNumber: maxNumber
	}
});

export const reduceNumber = (rowIndex, columnIndex) => ({
	type: REDUCE_NUMBER,
	payload: {
		rowIndex: rowIndex,
		columnIndex: columnIndex
	}
});

export const newGame = () => ({
	type: NEW_GAME
});

export const undo = ActionCreators.undo;
export const jump = ActionCreators.jump;