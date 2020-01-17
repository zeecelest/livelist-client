import React, { Component } from "react";

import notLikedIcon from "../../components/Assets/notLikeIcon.png";
import likedIcon from "../../components/Assets/likedIcon.png";
import "./likeButton.css";

export class likeButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      liked: '',
    }
  }

  componentDidMount(){
    this.setState({
      liked: this.props.liked,
    })
  }

  clickLike = () => {
    if (this.state.liked == '1'){
      this.setState({
        liked: '0'
      })
    }
    else if (this.state.liked == '0'){
      this.setState({
        liked: '1'
      })
    }
  }

  renderButtons = () => {
    if (this.state.liked == '1') {
      return (
        <div>
          <button  onClick={(ev) => {
            this.props.handleLikeButton(ev)
            this.clickLike()
          }}>
            <img
              id={this.props.id}
              src={likedIcon}
              className={`likedIcon`}
              alt="icon white"
            ></img>
          </button>
        </div>
      );
    } else if(this.state.liked == '0') {
      return (
        <div>
          <button  onClick={(ev) => {
            this.clickLike()
            this.props.handleLikeButton(ev)
          }}>
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
