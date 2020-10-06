import React from 'react';
import { connect } from "react-redux";
import { undo } from '../state/actions';

function UndoButton(props) {
  const handleClick = () => {
    props.undo();
  }
  return (
    <button onClick={handleClick}>Undo</button>
  )
}

export default connect(
  null,
  { undo }
)(UndoButton)