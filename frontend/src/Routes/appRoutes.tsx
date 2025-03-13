import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "../Components/Login/Login";
import Overlay from "../Components/Overlay/Overlay";

import Register from "../Components/Register/Register";
import UploadEmails from "../Components/Font-BackComponents/UploadEmails";
import EmailStatus from "../Components/Font-BackComponents/EmailStatus";
import { useAuth } from "../Contexts/AuthContext";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Login />;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Overlay />,
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
    path: "/status",
    element: (
	<ProtectedRoute>
		<EmailStatus />
	</ProtectedRoute>)
  },
];

const createRoutes = () => createBrowserRouter(routes);

export default createRoutes;
