import React from 'react';
import './App.css';
import Menu from './components/Menu';
import Undo from './components/Undo';
import Restart from './components/Restart';
import NumbersTable from './components/NumbersTable';
import { connect } from "react-redux";

function App(props) {
  let element;
  if (props.started === false) {
    element = <Menu/>;
  }
  else {
    element = <div><Restart/><Undo/><NumbersTable/></div>;
  }

  return (
    <main>
      {element}
    </main>
  );
}

function mapStateToProps(state) {
  return { started: state.present.started }
}

export default connect(
  mapStateToProps
)(App)