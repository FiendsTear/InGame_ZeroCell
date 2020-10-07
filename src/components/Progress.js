import React from 'react';
import { connect } from "react-redux";
import { TABLE_SIZE } from '../constants';

function Progress(props) {
  return (
  <span>passed: {Math.floor(props.zeroCells * 100/(TABLE_SIZE.width * TABLE_SIZE.height)) + '%'}</span>
  )
}

function mapStateToProps(state) {
  return { zeroCells: state.present.zeroCells }
}

export default connect(
  mapStateToProps
)(Progress)