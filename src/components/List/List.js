import React, { Component } from "react";
import Spot from "../Spot/Spot";

export class List extends Component {
  render() {
    return (
      <div>
        <h4>Name of Spot</h4>
        <Spot />
      </div>
    );
  }
}

export default List;
