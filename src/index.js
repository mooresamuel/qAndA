// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// <React.StrictMode>
{
  /* <Navbar bg="success-bg-subtle" className="navbar-back">
    </Navbar> */
}

{
  /* </React.StrictMode> */
}
