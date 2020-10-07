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
  let newState = {};
  newState.started = state.started;
  newState.won = state.won;
  newState.failed = state.failed;
  newState.numbers = state.numbers.slice();
  newState.stepsCount = state.stepsCount;
  newState.zeroCells = state.zeroCells;
  let rowIndex;
  let columnIndex;
  switch (action.type) {
    case NEW_GAME:
      newState = initialState;
      return newState;
      break;
    case START_GAME:
      newState.started = true;

      const maxNumber = action.payload.maxNumber;
      let numbersGenerated = false;
      let row = [];
      rowIndex = 0;
      columnIndex = 0;
      while (!numbersGenerated) {
        // update to forbid generation of max number in the corners
        const number = Math.floor(Math.random() * (maxNumber))+ 1;
        row.push(number);
        columnIndex++;
        if (columnIndex === TABLE_SIZE.width) {
          rowIndex++;
          newState.numbers.push(row);
          row = [];
          columnIndex = 0;
        }
        if (rowIndex === TABLE_SIZE.height) {
          numbersGenerated = true;
        }; 
      }
      return newState;
      break;
    case REDUCE_NUMBER:
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
            row = newState.numbers[rowIndex].slice();
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
            }) 
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
      break;
    default:
      return state;
  }
}

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
        }) 
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

export default undoable(reducer);