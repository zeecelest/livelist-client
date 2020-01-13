/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import PlayListContext from "../../contexts/PlayListContext";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
// import ListPage from '../../routes/ListPage/ListPage'
import "./userLists.css";

export class UserLists extends Component {
  state = {
    userList: []
  };
  static contextType = PlayListContext;

  handleClickList = ev => {
    ev.preventDefault();
    console.log()
  };

  renderUserList() {
    if(this.props.userList.length === 0){
      return <h2>no lists</h2>;
    }
    if (this.props.userList.length > 0) {
      return (
        <div className="display-user">
            {this.props.userList.map((item, idx) => {
              // This will likely need to be
              return (
                <div className='listItem'>
                <p key={idx} onClick={this.handleClickList}>
                  <Link to={`/list/${item.id}`}>
                    {item.name}
                  </Link>
                </p>
                </div>
              );
            })}
        </div>
      );
    }
    return <h2>no lists</h2>;
  }

  render() {
    return (
      <>
        <section className="userList-section">
          <h2 className='myList-title'>My Lists</h2>
          {this.renderUserList()}
          <div>
            <button id='newPlaylistButton'>
              <Link to="/newList" className='newPlaylistButtonText'>New Play List</Link>
            </button>
            <button id='editPlaylistButton'>
              <Link to="/editList" className='editPlaylistButtonText'>Edit Play List</Link>
            </button>
            <button id='deletePlaylistButton'>
              <Link to="/deleteList" className='deletePlaylistButtonText'>Delete Play List</Link>
            </button>
          </div>
         
        </section>
      </>
    );
  }
}

export default UserLists;
