import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { PlayListContext } from "./contexts/PlayListContext";

ReactDOM.render(
  <BrowserRouter>
    <PlayListContext>
      <App />
    </PlayListContext>
  </BrowserRouter>,
  document.getElementById("root")
);
