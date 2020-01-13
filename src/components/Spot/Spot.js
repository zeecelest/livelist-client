import React, { Component } from "react";
import Button from "../Button/Button";
import './Spot.css';

export class Spot extends Component {
  render() {
    console.log('Spot props id =>'+this.props.id)
    return (
      <div className="spotItem">
        <div className='spot-buttons'>
            <Button>Delete</Button>
            <Button>Edit</Button>
        </div>
        
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
