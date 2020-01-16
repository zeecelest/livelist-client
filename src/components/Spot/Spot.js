/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import Button from "../Button/Button";
import PlayListContext from "../../contexts/PlayListContext"
import { Link } from "react-router-dom";
import './Spot.css';

export class Spot extends Component {
  static contextType = PlayListContext;

  componentDidMount() {
    console.log('compdid=>' + this.context)
  }

  renderUserListId = () => {
    if(this.props.usersListIds.length > 0){
      return this.props.usersListIds.map(lists => {
        if(lists === parseInt(this.props.lid)) { 
          // console.log('list thing match',lists)
          return (
            <div className ='spot-buttons'>
                <Button onClick={ () => this.props.handleDeleteSpot(this.props.sid)}>Delete</Button>
                <Button >
                  <Link
                    to= {`/updateSpot/${this.props.lid}`}
                  >
                    Edit
                  </Link>
              </Button>
            </div>
          );
        } 
      })
    }
    
  }

  render() {
    console.log('spot props lid ',this.props.lid)
    console.log('spot props sid', this.props.sid)

    return (
      
      <div className="spotItem">

          {this.renderUserListId()}

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
