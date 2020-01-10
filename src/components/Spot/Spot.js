import React, { Component } from "react";

export class Spot extends Component {
  render() {
    return (
      <div className="spotItem">
        <h2 className='spotName'>{this.props.name}</h2>
          <p>{this.props.address}</p>
          <p>{this.props.city}</p>
          <p>{this.props.state}</p>
          <p>{this.props.tags}</p>
      </div>
    );
  }
}

export default Spot;
