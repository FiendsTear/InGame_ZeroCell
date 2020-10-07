import React from 'react';
import { connect } from "react-redux";
import { reduceNumber } from '../state/actions';

function Cell(props) {
  const handleCellClick = () => {
    props.reduceNumber(props.rowIndex, props.columnIndex);
  }

  return (
    <td className={"numbersTable-cell numbersTable-cell_value_" + props.value} onClick={handleCellClick}>
      {props.value}
    </td>);
}

function mapStateToProps(state, ownProps) {
  return { value: state.present.numbers[ownProps.rowIndex][ownProps.columnIndex] }
}

export default connect(
  mapStateToProps,
  { reduceNumber }
)(Cell)