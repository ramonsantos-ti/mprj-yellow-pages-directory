import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { IndicadoresProvider } from "./context/IndicadoresContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <IndicadoresProvider>
    <App />
  </IndicadoresProvider>
);

