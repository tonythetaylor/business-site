import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ContentProvider } from "./contexts/ContentContext";
import { ThemeProvider } from "./contexts/ThemeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
