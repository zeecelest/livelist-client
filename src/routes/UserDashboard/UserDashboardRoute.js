import React, { Component } from "react";
import PlayListContext from "../../contexts/PlayListContext";
import ListApiService from "../../services/lists-api-service";
import UserLists from "../../components/UserLists/userLists";
import ListByTags from "../../components/ListByTags/ListByTags";

export class UserDashboardRoute extends Component {
  state = {
    error: null,
    playlist: {},
    spots: {}
  };

  static contextType = PlayListContext;

  //get all lists for a specific user
  componentDidMount() {}

  render() {
    const value = {
      playlist: this.state.playlist,
      spots: this.state.words
    };
    return (
      <PlayListContext.Provider value={value}>
        <h2>Users Dashboard</h2>
        <UserLists />
        <ListByTags lists={this.state.lists} />
      </PlayListContext.Provider>
    );
  }
}

export default UserDashboardRoute;
