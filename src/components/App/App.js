import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

export default class App extends Component {
  state = { hasError: false };
  render() {
    return (
      <div className="App">
        <h1>The Social Playlist</h1>
      </div>
    );
  }
}
