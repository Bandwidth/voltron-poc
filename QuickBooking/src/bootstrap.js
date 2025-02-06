import ReactDOM from "react-dom/client";
import "@babel/polyfill";
import React from "react";
import "@bw/bw-styles/dist/bwStyles.css";
import App from "./App.tsx";
import "@bw/alloy-react";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(<App />);
