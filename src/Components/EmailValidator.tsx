import { useState } from "react";
import { ValidationResult } from "../types";

const EmailValidator = () => {
	const [email, setEmail] = useState("");
	const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
	const API_KEY = "yjxf7CsSCR6xJxz9lloazDwwM6lHGOmgoa106vAIkIoyIstqPDtGeFQrfU8I";

	const validateEmail = async () => {
		if (!email) return;

		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		};

		try {
			const url = `https://app.snapvalid.com/api/v1/verify?apikey=${API_KEY}&email=${email}`;
			console.log("Request URL:", url);
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data: ValidationResult = await response.json();
			console.log("Full API Response:", data);
			setValidationResult(data);
		} catch (error) {
			console.error("Error validating email:", error);
			setValidationResult({
				email,
				user: "",
				domain: "",
				accept_all: 0,
				role: 0,
				free_email: 0,
				disposable: 0,
				spamtrap: 0,
				success: false,
				result: "invalid",
				message: "Validation failed",
			});
		}
	};

	return (
		<div>
			<h1>Email Validator</h1>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Enter your email"
			/>
			<button onClick={validateEmail}>Validate</button>
			{validationResult && (
				<div>
					<h2>Validation Result:</h2>
					<p>{validationResult.success ? "Valid Email" : "Invalid Email"}</p>
					<p>{validationResult.message}</p>
					<p>Email: {validationResult.email}</p>
					{validationResult.success && (
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
					)}
				</div>
			)}
		</div>
	);
};

export default EmailValidator;
