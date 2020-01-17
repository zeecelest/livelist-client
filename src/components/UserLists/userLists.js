/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PlayListContext from '../../contexts/PlayListContext';

import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
// import ListPage from '../../routes/ListPage/ListPage'
import ScrollContainer from 'react-indiana-drag-scroll';
import './userLists.css';

export class UserLists extends Component {
  state = {
    userList: [],
    spots: []
  };
  static contextType = PlayListContext;

  renderUserList() {
    if (this.props.userList.length === 0) {
      return <h2>No Lists</h2>;
    }
    if (this.props.userList.length > 0) {
      return (
        <div className="display-user">
          {this.props.userList.map((item, idx) => {
            // This will likely need to be

            return (
              <div key={idx} className="listItem users">
                <p className="userListTitle" onClick={this.handleClickList}>
                  <Link to={`/list/${item.id}`} className="userListTitle">
                    {item.name}
                  </Link>
                </p>
                {this.props.checkLength === 0 && item.id ? (
                  <button
                    className="btn-list"
                    onClick={() => this.props.handleDeletePlaylist(item.id)}>
                    Delete
                  </button>
                ) : (
                  <button className="btn-list" disabled={true}>
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    return <h2>No Lists</h2>;
  }

  render() {
    return (
      <>
        <section className="userList-section">
          <h2 className="myList-title">My Lists</h2>
          <ScrollContainer
            className="userListContainer"
            horizontal={true}
            activationDistance={1}
            nativeMobileScroll={true}>
            {this.renderUserList()}
            <div className="newPlayListButtonContainer">
              <Button id="newPlaylistButton">
                <Link to="/newList" className="newPlaylistButtonText">
                  New Playlist
                </Link>
              </Button>
            </div>
          </ScrollContainer>
        </section>
      </>
    );
  }
}

export default UserLists;
