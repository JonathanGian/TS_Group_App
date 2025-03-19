import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "../Components/Login/Login";

import Register from "../Components/Register/Register";
import UploadEmails from "../Components/UploadEmails";
import EmailStatus from "../Components/EmailStatus";



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
	<UploadEmails />
)
},
  {
    path: "/email/status",
    element: (
	
		<EmailStatus />
	)
  },
  
];

export const createRoutes = () => createBrowserRouter(routes);

