import React, { Component } from "react";

import notLikedIcon from "../../components/Assets/notLikeIcon.png";
import likedIcon from "../../components/Assets/likedIcon.png";
import "./likeButton.css";

export class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: "",
      likes: ""
    };
  }

  componentDidMount() {
    this.setState({
      liked: this.props.liked,
      likes: this.props.likes
    });
  }

  clickLike = () => {
<<<<<<< HEAD
    if (this.state.liked === '1'){
=======
    if (this.state.liked == "1") {
>>>>>>> 0d2f9146ba446be8978066bb4e5909d34cd3811e
      this.setState({
        liked: "0",
        likes: this.state.likes - 1
<<<<<<< HEAD

      })
    }
    else if (this.state.liked === '0'){
=======
      });
    } else if (this.state.liked == "0") {
>>>>>>> 0d2f9146ba446be8978066bb4e5909d34cd3811e
      this.setState({
        liked: "1",
        likes: this.state.likes + 1
      });
    }
  };

  renderButtons = () => {
<<<<<<< HEAD
    if (this.state.liked === '1') {
=======
    if (this.state.liked == "1") {
>>>>>>> 0d2f9146ba446be8978066bb4e5909d34cd3811e
      return (
        <div className='likeButtonContainer'>
            <img
            onClick={ev => {
              this.props.handleLikeButton(ev);
              this.clickLike();
            }}
              id={this.props.id}
              src={likedIcon}
              className={`likedIcon`}
              alt="icon white"
            ></img>
          <p>{this.state.likes}</p>
        </div>
      );
<<<<<<< HEAD
    } else if(this.state.liked === '0') {
=======
    } else if (this.state.liked == "0") {
>>>>>>> 0d2f9146ba446be8978066bb4e5909d34cd3811e
      return (
        <div className='likeButtonContainer'>
            <img
            onClick={ev => {
              this.clickLike();
              this.props.handleLikeButton(ev);
            }}
              id={this.props.id}
              src={notLikedIcon}
              className="notLikedIcon"
              alt="icon grey"
            ></img>
          <p>{this.state.likes}</p>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderButtons()}</div>;
  }
}

export default LikeButton;
