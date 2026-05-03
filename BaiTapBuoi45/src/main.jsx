import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import App from "./App.jsx";

const theme = createTheme({
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: "#2563eb",
    },
    success: {
      main: "#22c55e",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
