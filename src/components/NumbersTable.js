import React from 'react';
import { connect } from "react-redux";
import Cell from './Cell';

function NumbersTable(props) {
  return (
    <table className={"numbersTable" + (props.won ? " numbersTable_won" : "") + (props.failed ? " numbersTable_failed" : "")}>
      <tbody>
        {props.numbers.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {row.map((number, columnIndex) => {
                return <Cell key={columnIndex} rowIndex={rowIndex} columnIndex={columnIndex}>{number}</Cell>;
              })}
            </tr>
          )
        })}
      </tbody>
    </table>);
}

function mapStateToProps(state) {
  return { 
    numbers: state.present.numbers,
    won: state.present.won,
    failed: state.present.failed
  }
}


export default connect(
  mapStateToProps
)(NumbersTable)