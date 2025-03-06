import { RouterProvider } from "react-router-dom";
import createRoutes from "./Routes/appRoutes.tsx";
import React from "react";
function App() {
  

  const router = createRoutes();

  return (
    <RouterProvider
      router={router}
    />
  );
}

export default App;
