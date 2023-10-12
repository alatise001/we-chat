import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import ThemeContextProvider from "./context/themeContext";
import ChatContextProvider from "./context/chatContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthContextProvider>
          {/* <ThemeContextProvider> */}
          <ChatContextProvider>
            <App />
          </ChatContextProvider>
          {/* </ThemeContextProvider> */}
        </AuthContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
