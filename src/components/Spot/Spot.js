/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import Button from "../Button/Button";
import PlayListContext from "../../contexts/PlayListContext"
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
                <Button className='spotDelete' onClick={ () => this.props.handleDeleteSpot(this.props.sid)}>Delete</Button>
                <Button className='spotDelete' >Edit</Button>
            </div>
          );
        } 
      })
    }
    
  }

  render() {
    // console.log('spot props sid ',this.props.sid)
    // console.log(typeof(this.props.usersListIds))

    return (
      
      <div className="spotItem">
          <h2 className='spotName'>{this.props.name}</h2>
          <p className='spotInfo'>{this.props.address}</p>
          <p className='spotInfo'>{this.props.city}</p>
          <p className='spotInfo'>{this.props.state}</p>
          <p className='spotTags'>{this.props.tags}</p>
          {this.renderUserListId()}
      </div>
    );
  }
}

export default Spot;
