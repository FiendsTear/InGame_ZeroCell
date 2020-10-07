import { ActionCreators } from 'redux-undo';

export const NEW_GAME = 'NEW_GAME';
export const REDUCE_NUMBER = 'REDUCE_NUMBER';

export const startGame = maxNumber => ({
  type: NEW_GAME,
  payload: {
    maxNumber: maxNumber
  }
})

export const reduceNumber = (rowIndex, columnIndex) => ({
  type: REDUCE_NUMBER,
  payload: {
    rowIndex: rowIndex,
    columnIndex: columnIndex
  }
})

export const undo = ActionCreators.undo;
export const jump = ActionCreators.jump;