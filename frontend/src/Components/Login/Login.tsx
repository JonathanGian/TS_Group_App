import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import "./Login.css";

const Login = () => {
	const { login } = useAuth();

	return (
		<div>
			<h1>Login Page</h1>
			<p>Please log in to continue.</p>
			<button onClick={login}>Log In</button>
		</div>
	);
};

export default Login;
