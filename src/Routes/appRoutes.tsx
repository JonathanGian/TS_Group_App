import { createBrowserRouter } from "react-router-dom";
import TestPage from "../Pages/TestPage/TestPage";
import ErrorPage from "../Pages/ErrorPage";

const createRoutes = () => {
  return createBrowserRouter(
    [
      {
        path: "/",
        element: <TestPage />,
        errorElement: <ErrorPage />,
        children: [
          {/* new routes go here: 
            path: "/test", element: <TestPage />  */},
       
        ],
      },
    ],
  );
};

export default createRoutes;
