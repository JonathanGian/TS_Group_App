import React from "react";

const TestingExampleComponent = () => {
	const sum = (a: number, b: number) => {
		return a + b;
	};

	return (
		<div className="result">
			<p>{sum(1, 2)}</p>
		</div>
	);
};

export default TestingExampleComponent;
