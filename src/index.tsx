import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { applyChanges } from "./utils/applyChanges";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

document.addEventListener("DOMNodeInserted", async () => await applyChanges());
