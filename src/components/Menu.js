import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../state/actions';
import { MAX_NUMBER } from '../constants';
import PropTypes from 'prop-types';


function Menu(props) {
	const startGame = (event) => {
		props.startGame(event.target.dataset.difficulty);
	};

	return (
		<div className="menu">
			<h1 className="menu-newGame">New Game</h1>
			<span className="menu-easyGame" data-difficulty={MAX_NUMBER.easy} onClick={startGame}>easy</span>
			<span className="menu-mediumGame" data-difficulty={MAX_NUMBER.medium} onClick={startGame}>medium</span>
			<span className="menu-hardGame" data-difficulty={MAX_NUMBER.hard} onClick={startGame}>hard</span>
		</div>);
}

Menu.propTypes = {
	startGame: PropTypes.func
};

export default connect(
	null,
	{ startGame }
)(Menu);