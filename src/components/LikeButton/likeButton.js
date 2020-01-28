import React, { Component } from 'react';

import notLikedIcon from '../../components/Assets/notLikeIcon.png';
import likedIcon from '../../components/Assets/likedIcon.png';
import './likeButton.css';

export class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: null,
      likes: null
    };
  }

  componentDidMount() {
    this.setState({
      liked: parseInt(this.props.liked),
      likes: parseInt(this.props.likes)
    });
  }

  clickLike = () => {
    if (this.state.liked === 1) {
      this.setState({
        liked: 0,
        likes: this.state.likes - 1
      });
    } else if (this.state.liked === 0) {
      this.setState({
        liked: 1,
        likes: this.state.likes + 1
      });
    }
  };

  renderButtons = () => {
    if (this.state.liked === '1') {
      return (
        <div className="likeButtonContainer">
          <img
            onClick={(ev) => {
              this.props.handleLikeButton(ev);
              this.clickLike();
            }}
            id={this.props.id}
            src={likedIcon}
            className={`likedIcon`}
            alt="icon white"></img>
          <p className="likes">{this.state.likes}</p>
        </div>
      );
    } else if (this.state.liked === '0') {
      return (
        <div className="likeButtonContainer">
          <img
            onClick={(ev) => {
              this.clickLike();
              this.props.handleLikeButton(ev);
            }}
            id={this.props.id}
            src={notLikedIcon}
            className="notLikedIcon"
            alt="icon grey"></img>
          <p className="likes">{this.state.likes}</p>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderButtons()}</div>;
  }
}

export default LikeButton;
