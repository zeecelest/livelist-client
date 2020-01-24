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
    // console.log('compdid=>' + this.context)
  }

  static defaultProps = {
    match: {
      params: {}
    }
  }

  handleSpotClick = () => {
    this.context.setSpotId(this.props.sid)
    this.context.setListId(this.props.lid)
  }
  renderUserListId = () => {
    if(this.props.usersListIds.length > 0){
      return this.props.usersListIds.map(lists => {
        // console.log('UserList ids to compare =>',this.props.usersListIds)
        // console.log('the list Id of what list we are in', lists)
        if(lists == parseInt(this.props.lid)) { 
          return (
            <div className ='spot-buttons'>
                <Button 
                  id='deleteSpotButton'
                  onClick={ () => this.props.handleDeleteSpot(this.props.sid)}>Delete</Button>
                <Button id='editSpotButton'>
                <Link
                    to= {`/updateSpot/${this.props.sid}`}
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
    return (
      
      <div className="spotItem"  onClick={this.handleSpotClick}>
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
