import React from 'react';
import { connect } from 'react-redux';
import { undo } from '../state/actions';
import PropTypes from 'prop-types';

function UndoButton(props) {
	const handleClick = () => {
		props.undo();
	};
	return (
		<button onClick={handleClick}>↶</button>
	);
}

UndoButton.propTypes = {
	undo: PropTypes.func
};

export default connect(
	null,
	{ undo }
)(UndoButton);