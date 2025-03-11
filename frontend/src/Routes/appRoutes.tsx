import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "../Components/Login/Login";
import Overlay from "../Components/Overlay/Overlay";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const { loggedIn } = useAuth();
	return loggedIn ? children : <Login />;
};

const routes: RouteObject[] = [
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<Overlay />
			</ProtectedRoute>
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
];

const createRoutes = () => createBrowserRouter(routes);

export default createRoutes;
