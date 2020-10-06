import { NEW_GAME, REDUCE_NUMBER } from './actions';
import undoable from 'redux-undo';

const initialState = {
  started: false,
  numbers:[]
};

const reducer = (state = initialState, action) => {
  let newState = {};
  newState.started = state.started;
  newState.numbers = state.numbers.slice();
  let rowIndex;
  let columnIndex;
  switch (action.type) {
    case NEW_GAME:
      newState.started = true;

      const maxNumber = action.payload.maxNumber;
      let numbersGenerated = false;
      let row = [];
      rowIndex = 0;
      columnIndex = 0;
      while (!numbersGenerated) {
        const number = Math.floor(Math.random() * (maxNumber))+ 1;

        row.push(number);
        columnIndex++;
        if (columnIndex === 10) {
          rowIndex++;
          newState.numbers.push(row);
          row = [];
          columnIndex = 0;
        }
        if (rowIndex === 10) {
          numbersGenerated = true;
        }; 
      }
      break;
    case REDUCE_NUMBER:
      let reducingAllowed = false;
      const clickedRowIndex = action.payload.rowIndex;
      const clickedColumnIndex = action.payload.columnIndex;
      const rowIndexesAffected = [clickedRowIndex - 1, clickedRowIndex, clickedRowIndex + 1];
      const columnIndexesAffected = [clickedColumnIndex - 1, clickedColumnIndex, clickedColumnIndex + 1];
      if (newState.numbers[clickedRowIndex][clickedColumnIndex] > 0) {
        rowIndexesAffected.forEach(rowIndex => {
          if (rowIndex >= 0 && rowIndex < 10) {
            columnIndexesAffected.forEach(columnIndex => {
              if (columnIndex >= 0 && columnIndex < 10) {
                if ((rowIndex != clickedRowIndex || columnIndex != clickedColumnIndex) && newState.numbers[rowIndex][columnIndex] > 0) {
                  reducingAllowed = true;
                }
              }
            }) 
          }
        });
      }
      if (reducingAllowed) {
        rowIndexesAffected.forEach(rowIndex => {
          if (rowIndex >= 0 && rowIndex < 10) {
            row = newState.numbers[rowIndex].slice();
            columnIndexesAffected.forEach(columnIndex => {
              if (columnIndex >= 0 && columnIndex < 10) {
                let value;
                if (row[columnIndex] - 1 > 0) {
                  value = row[columnIndex] - 1;
                }
                else {
                  value = 0;
                }
                row[columnIndex] = value;
              }
            }) 
            newState.numbers[rowIndex] = row;
          }
        });
      }
      break;
  }
  return newState;
}

export default undoable(reducer);