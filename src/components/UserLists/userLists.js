/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import PlayListContext from '../../contexts/PlayListContext';
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './userLists.css';

const payload = {
  id: 1,
  name: "Chips Fries Hut",
  tags: "#bestdrinks #goodmusic",
  address: "1214 Idaho Ave",
  city: "Santa Monica"
}

export class UserLists extends Component {
  state = {
    userList: [payload]
  }
  static contextType = PlayListContext;

  renderUserList(){

    return (
      <div className="display-user">
        <ul>
          {this.state.userList.map((item, idx) => 
                <li key={idx}>'User List sample: '{item.name}</li>
          )}
        </ul>
      </div>
    );
  }

  render() {
    console.log('user lists'+this.state.userList)
    return (
     <>
        <section className = 'userlist-section'>
                <h2>My Lists</h2>
                {this.renderUserList()}
                <Button>
                  <Link to='/newList'>New Play List</Link>
                </Button>
                  {/* <Link to = {'/userlist'} >
                    <Button>
                        Click Me
                    </Button>
                </Link> */}
          </section>
    </>
    )
  }
}

export default UserLists;
