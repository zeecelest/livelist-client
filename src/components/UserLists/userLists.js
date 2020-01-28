/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import PlayListContext from "../../contexts/PlayListContext";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import ScrollContainer from "react-indiana-drag-scroll";
// import { Icon } from "@iconify/react";
// import timesCircle from "@iconify/icons-fa-regular/times-circle";
// import editIcon from "@iconify/icons-fa-regular/edit";
import List from "../List/List";

import "./userLists.css";

export class UserLists extends Component {
  state = {
    userList: [],
    spots: []
  };

  static defaultProps = {
    match: {
      params: {}
    }
  };

  static contextType = PlayListContext;

  componentDidMount() {
    this.props.userList;
  }

  renderUserList() {
    if (this.props.userList.length === 0) {
      return <h2 class="emptyLists">No Lists</h2>;
    }
    if (this.props.userList.length > 0) {
      return (
        <div className="display-user">
          {this.props.userList.map((item, idx) => {
            // This will likely need to be

            return (
              <List
                key={idx}
                user_id={item.id}
                name={item.name}
                listInfo={item}
                handleDeletePlaylist={this.props.handleDeletePlaylist}
                userList={this.state.userList}
                checkLength={this.props.checkLength}
              />
            );
          })}
        </div>
      );
    }
    return <h2 className='emptyLists'>No Lists</h2>;
  }

  render() {
    return (
        <section className="userList-section">
          <h2 className="myList-title">My Lists</h2>
          <ScrollContainer
            className="userListContainer"
            nativeMobileScroll={true}
          >
            {this.renderUserList()}
          </ScrollContainer>
                      <div className="newPlayListButtonContainer">
              <Button id="newPlaylistButton">
                <Link to="/newList" className="newPlaylistButtonText">
                  New List
                </Link>
              </Button>
            </div>
        </section>
    );
  }
}

export default UserLists;
