import React from "react";
import { useValidation } from "../../Contexts/ValidationContext";

const Result: React.FC = () => {
	const { validationResult, bulkStatus } = useValidation();

	return (
		<div className="result">
			<h1>Result</h1>
			{validationResult && (
				<div className="validation-result">
					<h2>Validation Result:</h2>
					<p>{validationResult.success ? "Valid Email" : "Invalid Email"}</p>
					<p>{validationResult.message}</p>
					<p>Email: {validationResult.email}</p>
					<div>
						<p>User: {validationResult.user}</p>
						<p>Domain: {validationResult.domain}</p>
						<p>Accept All: {validationResult.accept_all}</p>
						<p>Role: {validationResult.role}</p>
						<p>Free Email: {validationResult.free_email}</p>
						<p>Disposable: {validationResult.disposable}</p>
						<p>Spamtrap: {validationResult.spamtrap}</p>
						<p>Result: {validationResult.result}</p>
					</div>
				</div>
			)}
			{bulkStatus && (
				<div className="bulk-status">
					<h2>Bulk Status:</h2>
					<pre>{JSON.stringify(bulkStatus, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};

export default Result;
