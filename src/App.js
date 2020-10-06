import React from 'react';
import './App.css';
import Menu from './components/Menu';
import NumbersTable from './components/NumbersTable';
import { connect } from "react-redux";

function App(props) {
  let element;
  if (props.started === false) {
    element = <Menu/>;
  }
  else {
    element = <NumbersTable/>;
  }

  return (
    <div>
      {element}
    </div>
  );
}

function mapStateToProps(state) {
  return { started: state.started }
}

export default connect(
  mapStateToProps
)(App)