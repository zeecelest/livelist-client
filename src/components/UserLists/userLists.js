/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import PlayListContext from "../../contexts/PlayListContext";

import { Link } from "react-router-dom";
// import Button from "../../components/Button/Button";
// import ListPage from '../../routes/ListPage/ListPage'
import ScrollContainer from 'react-indiana-drag-scroll'
import "./userLists.css";

export class UserLists extends Component {
  state = {
    userList: [],
    spots: []
  };
  static contextType = PlayListContext;


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
                <div key={idx} className='listItem'>
                  
                <button className = "btn-list" onClick = { () => this.props.handleDeletePlaylist(item.id)} >Delete</button>
                  
                <p key={idx} onClick={this.handleClickList}>
                  <Link to={`/list/${item.id}`} >
                    {/* item.id is for checking only */}
                    {item.id}
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
  // console.log('list id from list page =>' +this.props.list_id)
  // console.log('spots length =>' +this.state.spots.length)
  // console.log('props user id =>' + this.props.userid)
    return (
      <>
        <section className="userList-section">
          <h2 className='myList-title'>My Lists</h2>
          <ScrollContainer 
            className='userListContainer'
            horizontal={true}
            activationDistance={1}
            nativeMobileScroll={true}
          >
          {this.renderUserList()}
          <div>
            <button id='newPlaylistButton'>
              <Link to="/newList" className='newPlaylistButtonText'>New Play List</Link>
            </button>
          </div>
         
          </ScrollContainer>
        </section>
      </>
    );
  }
}

export default UserLists;
