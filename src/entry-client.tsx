import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.hydrateRoot(
  document ? (document.getElementById("app") as any) : null,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
