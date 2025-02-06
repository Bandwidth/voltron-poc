import ReactDOM from "react-dom/client";
import "@babel/polyfill";
import React from "react";
import "@bw/bw-styles/dist/bwStyles.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
