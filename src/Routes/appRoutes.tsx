import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import EmailValidator from "../Components/EmailValidator";
import BulkEmailUploader from "../Components/BulkEmailUploader/BulkEmailUploder";
import BulkStatus from "../Components/BulkStatus";

const createRoutes = () => {
  return createBrowserRouter(
    [
      {
        path: "/",
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
          { path: "/single", element: <EmailValidator /> },
          { path: "/batch", element: <BulkEmailUploader /> },
          { path: "/status", element: <BulkStatus /> },
       
        ],
      },
    ],
  );
};

export default createRoutes;
