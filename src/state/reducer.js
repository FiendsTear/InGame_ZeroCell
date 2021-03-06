import { START_GAME, NEW_GAME, REDUCE_NUMBER } from './actions';
import undoable from 'redux-undo';
import { TABLE_SIZE } from '../constants';

const initialState = {
	started: false,
	won: false,
	failed: false,
	stepsCount: 0,
	zeroCells: 0,
	numbers:[]
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	newState.numbers = state.numbers.slice();
	let rowIndex;
	let columnIndex;
	switch (action.type) {
	case NEW_GAME: {
		newState = initialState;
		return newState;
	}
	case START_GAME: {
		newState.started = true;
		const maxNumber = action.payload.maxNumber;
		let numbersGenerated = false;
		let row = [];
		newState.numbers.push(row);
		rowIndex = 0;
		columnIndex = 0;
		while (!numbersGenerated) {
			let number = Math.floor(Math.random() * (maxNumber))+ 1;
			if (rowIndex >= 1 && columnIndex >= 1) {
				// we'll check just one cell on top-left to reduce algorithm complexity
				let cellZeroable = false;
				while (!cellZeroable) {
					number = Math.floor(Math.random() * (maxNumber)) + 1;
					cellZeroable = checkCellZeroability(newState.numbers, rowIndex - 1, columnIndex - 1, number);
				}
			}
			row.push(number);
			columnIndex++;
			if (columnIndex === TABLE_SIZE.width) {
				rowIndex++;
				row = [];
				if (rowIndex < TABLE_SIZE.height) {
					newState.numbers.push(row);
				}
				columnIndex = 0;
			}
			if (rowIndex === TABLE_SIZE.height) {
				numbersGenerated = true;
			} 
		}
		return newState;
	}
	case REDUCE_NUMBER: {
		const clickedRowIndex = action.payload.rowIndex;
		const clickedColumnIndex = action.payload.columnIndex;
		const isReducingAllowed = checkReducingPossibility(newState.numbers, clickedRowIndex, clickedColumnIndex);
		if (!isReducingAllowed) {
			return state;
		}
		else {
			newState.stepsCount++;
			const rowIndexesAffected = [clickedRowIndex - 1, clickedRowIndex, clickedRowIndex + 1];
			const columnIndexesAffected = [clickedColumnIndex - 1, clickedColumnIndex, clickedColumnIndex + 1];
			let isAnyCellZeroed = false;
			rowIndexesAffected.forEach(rowIndex => {
				if (rowIndex >= 0 && rowIndex < TABLE_SIZE.height) {
					const row = newState.numbers[rowIndex].slice();
					columnIndexesAffected.forEach(columnIndex => {
						if (columnIndex >= 0 && columnIndex < TABLE_SIZE.width) {
							if (row[columnIndex] - 1 >= 0) {
								row[columnIndex] = row[columnIndex] - 1;
								if (row[columnIndex] === 0) {
									newState.zeroCells++;
									isAnyCellZeroed = true;
								}
							}
						}
					}); 
					newState.numbers[rowIndex] = row;
				}
			});
			if (isAnyCellZeroed) {
				const gameProgress = checkProgress(newState.numbers);
				if (gameProgress === 'win') {
					newState.won = true;
				}
				if (gameProgress === 'fail') {
					newState.failed = true;
				}
			}
		}
		return newState;
	}
	default:
		return state;
	}
};

function checkReducingPossibility(numbers, clickedRowIndex, clickedColumnIndex) {
	let isReducingAllowed = false;
	const rowIndexesAffected = [clickedRowIndex - 1, clickedRowIndex, clickedRowIndex + 1];
	const columnIndexesAffected = [clickedColumnIndex - 1, clickedColumnIndex, clickedColumnIndex + 1];
	if (numbers[clickedRowIndex][clickedColumnIndex] > 0) {
		rowIndexesAffected.forEach(rowIndex => {
			if (rowIndex >= 0 && rowIndex < TABLE_SIZE.height) {
				columnIndexesAffected.forEach(columnIndex => {
					if (columnIndex >= 0 && columnIndex < TABLE_SIZE.width) {
						if ((rowIndex != clickedRowIndex || columnIndex != clickedColumnIndex) && numbers[rowIndex][columnIndex] > 0) {
							isReducingAllowed = true;
							return isReducingAllowed;
						}
					}
				}); 
			}
		});
	}
	return isReducingAllowed;
}

function checkProgress(numbers) {
	let result;
	let allCellsZeroed = true;
	for (let i = 0; i < numbers.length; i++) {
		const row = numbers[i];
		for (let j = 0; j < row.length; j++) {
			const isReducingAllowed = checkReducingPossibility(numbers, i, j);
			if (numbers[i][j] !== 0) {
				allCellsZeroed = false;
			}
			if (isReducingAllowed) {
				result = 'progress';
				return result;
			}
		}
	}
	if (!allCellsZeroed) {
		result = 'fail';
	}
	if (allCellsZeroed) {
		result = 'win';
	}
	return result;
}

function checkCellZeroability(numbers, rowIndex, columnIndex, generatedNumber) {
	let cellZeroable = false;
	const checkingCellValue = numbers[rowIndex][columnIndex];
	// corners
	let topLeftCellValue = 0;
	let topRightCellValue = 0;
	let bottomLeftCellValue = 0;
	if (rowIndex > 0) {
		topRightCellValue = numbers[rowIndex - 1][columnIndex + 1];
		if (columnIndex > 0) {
			topLeftCellValue = numbers[rowIndex - 1][columnIndex - 1];
		}
	}
	if (columnIndex > 0) {
		bottomLeftCellValue = numbers[rowIndex + 1][columnIndex - 1];
	}
	const sum = (
		generatedNumber + 
		topLeftCellValue +
		topRightCellValue +
		bottomLeftCellValue
	);
	if (checkingCellValue <= sum) {
		cellZeroable = true;
		return cellZeroable;
	}
	// top + bottom
	let topCellValue;
	if (rowIndex > 0) {
		topCellValue = numbers[rowIndex - 1][columnIndex];
	}
	else {
		topCellValue = 0;
	}
	const bottomCellValue = numbers[rowIndex + 1][columnIndex];
	if (checkingCellValue <= (topCellValue + bottomCellValue)) {
		cellZeroable = true;
		return cellZeroable;
	}
	// left + right
	let leftCellValue;
	if (columnIndex > 0) {
		leftCellValue = numbers[rowIndex][columnIndex - 1];
	}
	else {
		leftCellValue = 0;
	}
	const rightCellValue = numbers[rowIndex][columnIndex + 1];
	if (checkingCellValue <= (leftCellValue + rightCellValue)) {
		cellZeroable = true;
		return cellZeroable;
	}
	return cellZeroable;
}

export default undoable(reducer);