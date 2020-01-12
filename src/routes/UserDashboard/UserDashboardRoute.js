import React, { Component } from "react";
import PlayListContext from "../../contexts/PlayListContext";
import ListApiService from "../../services/lists-api-service";
import UserApiService from "../../services/lists-api-service";
import UserLists from "../../components/UserLists/userLists";
import ListByTags from "../../components/ListByTags/ListByTags";

export class UserDashboardRoute extends Component {
  static contextType = PlayListContext;
  state = {
    error: null,
    playlist: {},
    userList: [],
    lists: []
  };

  static contextType = PlayListContext;

  //get all lists for a specific user
  componentDidMount() {
    ListApiService.getUsersLists()
    .then(data => {
      console.log('data from the server on userList call', data)
        this.setState({
           userList: data
        })
    })
    .catch(this.context.setError);
    
    ListApiService.getLists()
    .then(data => {
      console.log('this data from getLists call', data)
        this.setState({
           lists: data
        })
    })
    .catch(this.context.setError);
  }

  render() {
    console.log('state in the UserDashboard',this.state)
    const value = {
      playlist: this.state.playlist,
      spots: this.state.words,
      userList: this.state.userList,
      lists:this.state.lists
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
