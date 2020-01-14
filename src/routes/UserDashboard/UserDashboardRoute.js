import React, { Component } from "react";
import PlayListContext from "../../contexts/PlayListContext";
import ListApiService from "../../services/lists-api-service";
import UserLists from "../../components/UserLists/userLists";
import ListByTags from "../../components/ListByTags/ListByTags";
import loadingAnimation from '../../components/Assets/loadingAnimation.gif';

export class UserDashboardRoute extends Component {
  static contextType = PlayListContext;
  state = {
    error: null,
    playlist: {},
    userList: [],
    lists: [],
    loading: false
  };

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleNewPlaylistCreation = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/dashboard";
    history.push(destination);
  };

  handleDeletePlaylist = playId => {
    // if(playid === this.state.lists)

    ListApiService.deleteLists(playId)
    .then( () => {
     console.log(`Record '${playId}' deleted`)
      const newUserList = this.state.userList.filter(userlist => userlist.id !== playId)
      this.setState({
        userList: newUserList
      })
    })
    .catch(this.context.setError);
  }

  //get all lists for a specific user
  componentDidMount() {
    this.setState({
      loading: true
    })
    ListApiService.getUsersLists()
    .then(data => {
      console.log('data from the server on userList call', data)
        this.setState({
           userList: data,
        })
    })
    .catch(this.context.setError);
    
    ListApiService.getLists()
    .then(data => {
      console.log('this data from getLists call', data)
        this.setState({
           lists: data,
        })
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 1000);
    })
    .catch(this.context.setError);
  }

  renderWithLoading = () =>{
    const value = {
      playlist: this.state.playlist,
      spots: this.state.words,
      userList: this.state.userList,
      lists:this.state.lists,
      handleDeletePlaylist: this.handleDeletePlaylist
    };
    if (this.state.loading) {
      return (
        <div className="loadingContainer">
          <img
            src={loadingAnimation}
            alt="loading"
            className="loadingAnimation"
          ></img>
          <h3 className="loadingText">Loading...</h3>
        </div>
      );
    } else {
     return (
     <div>
      <PlayListContext.Provider value={value}>
        <UserLists userList={this.state.userList} handleDeletePlaylist ={this.handleDeletePlaylist} />
        <ListByTags lists={this.state.lists} userList={this.state.userList}/>
      </PlayListContext.Provider>
      </div>)
    }
  }


  render() {
    return (
      <div>
        {this.renderWithLoading()}
      </div>
    );
  }
}

export default UserDashboardRoute;
