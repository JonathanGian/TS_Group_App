import { RouterProvider } from "react-router-dom";
import createRoutes from "./Routes/appRoutes";
import React from "react";
import { AuthProvider } from "./Contexts/AuthContext";
import "./App.css";
import { ValidationProvider } from "./Contexts/ValidationContext";

function App() {
	const router = createRoutes();

	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
