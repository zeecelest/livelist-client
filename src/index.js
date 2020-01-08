import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { PlayListProvider } from "./contexts/PlayListContext";

ReactDOM.render(
  <BrowserRouter>
    <PlayListProvider>
      <App />
    </PlayListProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
