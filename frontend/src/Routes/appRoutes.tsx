import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "../Components/Login/Login";

import Register from "../Components/Register/Register";
import UploadEmails from "../Components/UploadEmails";
import EmailStatus from "../Components/EmailStatus";
import { useAuth } from "../Contexts/AuthContext";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Login />;
};

const routes: RouteObject[] = [
{
  path: "/",
  element: <Login />,
},
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/upload-emails",
    element:(
	<ProtectedRoute >
	<UploadEmails />
	</ProtectedRoute>
	)
},
  {
    path: "/email/status",
    element: (
	<ProtectedRoute>
		<EmailStatus />
	</ProtectedRoute>)
  },
  
];

export const createRoutes = () => createBrowserRouter(routes);

