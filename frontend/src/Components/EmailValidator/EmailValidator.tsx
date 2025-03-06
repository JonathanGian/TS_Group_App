import React, { useState } from "react";
import { ValidationResult } from "../../types";
import { useValidation } from "../../Contexts/ValidationContext";

const EmailValidator = () => {
	const [email, setEmail] = useState("");
	const { setValidationResult } = useValidation();
	const API_KEY = import.meta.env.VITE_API_KEY;

	const validateEmail = async () => {
		if (!email) return;
		console.log("API_KEY", API_KEY);
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		};

		try {
			const url = `https://app.snapvalid.com/api/v1/verify?apikey=${API_KEY}&email=${email}`;
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data: ValidationResult = await response.json();
			setValidationResult(data);
		} catch (error) {
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
				result: "",
				message: "",
			});
		}
	};

	return (
		<div className="email-validator">
			<h1>Email Validator</h1>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Enter your email"
			/>
			<button onClick={validateEmail}>Validate</button>
		</div>
	);
};

export default EmailValidator;
