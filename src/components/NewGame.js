import React from 'react';
import { connect } from 'react-redux';
import { newGame } from '../state/actions';
import PropTypes from 'prop-types';

function NewGameButton(props) {
	const handleClick = () => {
		props.newGame();
	};
	return (
		<button onClick={handleClick}>new game</button>
	);
}

NewGameButton.propTypes = {
	newGame: PropTypes.func
};
export default connect(
	null,
	{ newGame }
)(NewGameButton);