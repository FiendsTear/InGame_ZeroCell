import React from 'react';
import { connect } from "react-redux";
import { jump } from '../state/actions';

function RestartButton(props) {
  const handleClick = () => {
    props.jump(-props.stepsToRestart);
  }
  return (
    <button onClick={handleClick}>Restart</button>
  )
}

function mapStateToProps(state) {
  return { stepsToRestart: state.present.stepsCount }
}

export default connect(
  mapStateToProps,
  { jump }
)(RestartButton)