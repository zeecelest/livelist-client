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
    if (this.props.userList) {
      return (
        <div className="display-user">
          <ul>
            {this.props.userList.map((item, idx) => {
              // This will likely need to be
              return (
                <li key={idx} onClick={this.handleClickList}>
                  <Link to={`/list/${item.id}`}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    return <h2>welp</h2>;
  }

  render() {
    return (
      <>
        <section className="userlist-section">
          <h2>My Lists</h2>
          {this.renderUserList()}
          <Button>
            <Link to="/newList">New Play List</Link>
          </Button>
          {/* <Link to = {'/userlist'} >
                    <Button>
                        Click Me
                    </Button>
                </Link> */}
        </section>
      </>
    );
  }
}

export default UserLists;
