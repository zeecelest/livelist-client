import React, { Component } from "react";
import PlayListContext from "../../contexts/PlayListContext";
import ListApiService from "../../services/lists-api-service";
import UserLists from "../../components/UserLists/userLists";
import ListByTags from "../../components/ListByTags/ListByTags";

export class UserDashboardRoute extends Component {
  state = {
    error: null,
    playlist: {},
    userList: []
  };

  static contextType = PlayListContext;

  //get all lists for a specific user
  componentDidMount() {
      this.loadUserList();
      this.loadAllList();
  }

  loadUserList() {
    console.log('for user list - api service call')
  }

  loadAllList() {
    console.log('for all list - api service call')
  }

  render() {
    const value = {
      playlist: this.state.playlist,
      spots: this.state.words,
      userList: this.state.userList
    };
    console.log('user list' + this.state.userList);
    return (
      <PlayListContext.Provider value={value}>
        <UserLists userList={this.state.UserList}/>
        <ListByTags lists={this.state.lists} />
      </PlayListContext.Provider>
    );
  }
}

export default UserDashboardRoute;
