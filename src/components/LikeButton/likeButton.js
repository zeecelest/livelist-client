import React, { Component } from "react";

import notLikedIcon from "../../components/Assets/notLikeIcon.png";
import likedIcon from "../../components/Assets/likedIcon.png";
import "./likeButton.css";

export class likeButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      liked: '',
      likes: ''
    }
  }

  componentDidMount(){
    this.setState({
      liked: this.props.liked,
      likes: this.props.likes
    })
  }

  clickLike = () => {
    if (this.state.liked == '1'){
      this.setState({
        liked: '0',
        likes: this.state.likes - 1

      })
    }
    else if (this.state.liked == '0'){
      this.setState({
        liked: '1',
        likes: this.state.likes + 1
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
    <p>{this.state.likes}</p>
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
            <p>{this.state.likes}</p>
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
