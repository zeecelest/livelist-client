import React, { Component } from "react";
import PlayListContext from "../../contexts/PlayListContext";
import ListApiService from "../../services/lists-api-service";
import UserApiService from "../../services/lists-api-service";
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

    // UserApiService.getUsersListByUserId(1)
    //   .then(data => {
    //       console.log('userlist id ' + data.id)
    //       // this.setState({
    //       //   // userList: data
    //       // })
    //   })
    //   .catch(res => this.setState({ error: res.error }));
  }

  loadAllList() {
    // console.log('for all list - api service call')
  }

  render() {
    console.log('user list' + this.state.userList)
    const value = {
      playlist: this.state.playlist,
      spots: this.state.words,
      userList: this.state.userList
    };
    return (
      <PlayListContext.Provider value={value}>
        <UserLists userList={this.state.userList}/>
        <ListByTags lists={this.state.lists} />
      </PlayListContext.Provider>
    );
  }
}

export default UserDashboardRoute;
