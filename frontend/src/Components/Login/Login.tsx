import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import './Login.css'

const Login = () => {
	const { login } = useAuth();

	return (
		<div className={"login-container"}>
			<h1>Login Page</h1>
			<input className={"login-input"} placeholder="  example@.com"></input>
			
			<button className={"login-button"} onClick={login}>Log In</button>

			<p>Please log in to continue.</p>
		</div>
	);
};

export default Login;
