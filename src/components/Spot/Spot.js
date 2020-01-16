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

  static defaultProps = {
    match: {
      params: {}
    }
  }

  handleSpotClick = () => {
    console.log('clicked ')
    this.context.setSpotId(this.props.sid)
    this.context.setListId(this.props.lid)
  }
  renderUserListId = () => {
    if(this.props.usersListIds.length > 0){
      return this.props.usersListIds.map(lists => {
        if(lists === parseInt(this.props.lid)) { 
          console.log('list thing match',lists)
          return (
            <div className ='spot-buttons'>
                <Button onClick={ () => this.props.handleDeleteSpot(this.props.sid)}>Delete</Button>
                <Button>
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
    // console.log('spot context listid ',this.context.listid)
    console.log('spot props sid', this.props.sid)
    console.log('spot id conttext', this.context.spotid)

    const {sid} = this.context
    console.log('sid', this.props.sid);

    // this.context.setSpotId(this.props.sid)
    // console.log('spotid context' , this.context.spotid)
    
    return (
      
      <div className="spotItem"  onClick={this.handleSpotClick}>

          {this.renderUserListId()}

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
