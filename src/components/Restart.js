import React from 'react';
import { connect } from 'react-redux';
import { jump } from '../state/actions';
import PropTypes from 'prop-types';

function RestartButton(props) {
	const handleClick = () => {
		props.jump(-props.stepsToRestart);
	};
	return (
		<button onClick={handleClick}>restart</button>
	);
}

function mapStateToProps(state) {
	return { stepsToRestart: state.present.stepsCount };
}

RestartButton.propTypes = {
	jump: PropTypes.func,
	stepsToRestart: PropTypes.number
};

export default connect(
	mapStateToProps,
	{ jump }
)(RestartButton);