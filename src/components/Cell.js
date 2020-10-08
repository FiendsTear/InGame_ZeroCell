import React from 'react';
import { connect } from 'react-redux';
import { reduceNumber } from '../state/actions';
import PropTypes from 'prop-types';


function Cell(props) {
	const handleCellClick = () => {
		props.reduceNumber(props.rowIndex, props.columnIndex);
	};

	return (
		<td className={'numbersTable-cell numbersTable-cell_value_' + props.value} onClick={handleCellClick}>
			{props.value}
		</td>);
}

function mapStateToProps(state, ownProps) {
	return { value: state.present.numbers[ownProps.rowIndex][ownProps.columnIndex] };
}

Cell.propTypes = {
	reduceNumber: PropTypes.func,
	rowIndex: PropTypes.number,
	columnIndex: PropTypes.number,
	value: PropTypes.number
};

export default connect(
	mapStateToProps,
	{ reduceNumber }
)(Cell);