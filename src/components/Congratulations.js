import React from 'react';

function Congratulations() {
	const words = ['Excellent!', 'Impressive!', 'Splendid!'];
	const randomNumber = Math.floor(Math.random() * (3));
	const randomWord = words[randomNumber];
	return (
		<h1 className="congratulations">{randomWord}</h1>
	);
}

export default Congratulations;