import React from 'react';
import { connect } from "react-redux";
import { newGame } from '../state/actions';

function NewGameButton(props) {
  const handleClick = () => {
    props.newGame();
  }
  return (
    <button onClick={handleClick}>new game</button>
  )
}

export default connect(
  null,
  { newGame }
)(NewGameButton)