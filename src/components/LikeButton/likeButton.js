import React, { Component } from "react";

import notLikedIcon from "../../components/Assets/notLikeIcon.png";
import likedIcon from "../../components/Assets/likedIcon.png";
import "./likeButton.css";

export class likeButton extends Component {

  renderButtons = () => {
    if (this.props.liked == 1) {
      return (
        <div>
          <button  onClick={(ev) => this.props.handleLikeButton(ev)}>
            <img
              id={this.props.id}
              src={likedIcon}
              className={`likedIcon`}
              alt="icon white"
            ></img>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={(ev) => this.props.handleLikeButton(ev)}>
            <img
              id={this.props.id}
              src={notLikedIcon}
              className="notLikedIcon"
              alt="icon grey"
            ></img>
          </button>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderButtons()}</div>;
  }
}

export default likeButton;
