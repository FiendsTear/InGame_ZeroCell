import React from 'react';
import { connect } from "react-redux";

function Progress(props) {
  return (
  <span>passed: {props.zeroCells + '%'}</span>
  )
}

function mapStateToProps(state) {
  return { zeroCells: state.present.zeroCells }
}

export default connect(
  mapStateToProps
)(Progress)