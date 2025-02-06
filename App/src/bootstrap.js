import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "@babel/polyfill";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
