import React, { Component } from "react";
import ListsApiService from "../../services/lists-api-service";
import notLikedIcon from "../../components/Assets/notLikeIcon.png";
import likedIcon from "../../components/Assets/likedIcon.png";
import "./likeButton.css";

export class likeButton extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  state = {
    updated: false
  };
  handleLike = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/dashboard";
    history.push(destination);
  };
  //this will need if its a liked or an unliked as a prop to render a different color.
  // ListId is passed as prop called key
  // It will have the ability to make an api call to toggle the liked_by_user status.

  // Make API service for the call
  // api/lists/like/:list_id
  componentDidMount() {}

  handleLikeButton = () => {
    console.log("i heard that");
    ListsApiService.toggleLike(`${this.props.id}`)
      .then(like => {
        this.handleLike();
        this.setState({
          updated: true
        });
      })
      .catch(() => console.log("error"));
  };

  renderButtons = () => {
    if (this.props.liked == 1) {
      return (
        <div>
          <button onClick={this.handleLikeButton}>
            <img src={likedIcon} className="likedIcon" alt="icon white"></img>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.handleLikeButton}>
            <img
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
