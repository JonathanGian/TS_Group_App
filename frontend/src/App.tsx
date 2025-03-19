import { RouterProvider } from "react-router-dom";
import { createRoutes } from "./Routes/appRoutes";
import React from "react";
import { AuthProvider } from "./Contexts/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./Theme/theme";
import "./App.css";
import useAuthCheck from "./Hooks/useAuthCheck";

function App() {
  const router = createRoutes();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
