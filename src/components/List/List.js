import React, { Component } from "react";
import LikeButton from '../LikeButton/likeButton';
import './List.css'


export class List extends Component {
  render() {
    if(this.props.liked){
      return(
        <div  
        id={this.props.id} 
        className={this.props.className}>
        <h5 className="list-name">{this.props.name}</h5>
        <LikeButton 
          id={this.props.id}
          likes={this.props.likes}
          liked={this.props.liked}
          handleLikeButton={this.props.handleLikeButton}
          />
    </div>
      )
  } else {
    return (
      <div  
        id={this.props.id} 
        className={`listItem ${this.props.addClass}`}>
        <h5 className="list-name">{this.props.name}</h5>
    </div>
    );
  }
  }
}

export default List;
