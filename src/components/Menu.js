import React from 'react';
import { connect } from "react-redux";
import { startGame } from '../state/actions';
import { MAX_NUMBER } from '../constants';

function Menu(props) {
  const startGame = (event) => {
    props.startGame(event.target.dataset.difficulty);
  }

  return (
    <div>
      <h1>New Game</h1>
      <div data-difficulty={MAX_NUMBER.easy} onClick={startGame}>easy</div>
      <div data-difficulty={MAX_NUMBER.medium} onClick={startGame}>medium</div>
      <div data-difficulty={MAX_NUMBER.hard} onClick={startGame}>hard</div>
    </div>);
}

export default connect(
  null,
  { startGame }
)(Menu)