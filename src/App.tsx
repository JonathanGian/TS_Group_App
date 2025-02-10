import { RouterProvider } from "react-router-dom";
import createRoutes from "./Routes/appRoutes.tsx";

function App() {
  

  const router = createRoutes();

  return (
    <RouterProvider
      router={router}
    />
  );
}

export default App;
