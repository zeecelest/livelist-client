import React, { Component } from "react";
import Button from "../Button/Button";
import PlayListContext from "../../contexts/PlayListContext"
import './Spot.css';

export class Spot extends Component {
  static contextType = PlayListContext;

  componentDidMount() {
    console.log('compdid=>' + this.context)
  }
  render() {
    console.log('spot props ',this.props)
    return (
      <div className="spotItem">
        {this.props.lid === '34'  //temporary id is pass
          ? <div className='spot-buttons'>
              <Button onClick={ () => this.props.handleDeleteSpot(this.props.sid)}>Delete</Button>
              <Button>Edit</Button>
          </div>
          : '' }
        
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
