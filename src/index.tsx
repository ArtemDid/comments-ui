import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./root/App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { theme } from "./common/constants/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <Toaster />
    <App />
  </ThemeProvider>
);

reportWebVitals();
