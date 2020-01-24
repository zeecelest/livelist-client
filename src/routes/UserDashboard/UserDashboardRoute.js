import React, { Component } from 'react';
import PlayListContext from '../../contexts/PlayListContext';
import ListApiService from '../../services/lists-api-service';
import UserLists from '../../components/UserLists/userLists';
import ListByTags from '../../components/ListByTags/ListByTags';
import loadingAnimation from '../../components/Assets/loadingAnimation.gif';
import './UserDashboard.css';
import ListsApiService from "../../services/lists-api-service";
import HotIn from '../../components/HotInComponent/HotIn';

export class UserDashboardRoute extends Component {
  static contextType = PlayListContext;
  state = {
    error: null,
    playlist: {},
    userList: [],
    lists: [],
    spots: [],
    loading: false,
    checkLength: 0,
    likedChange: false,
    userCity:''
  };

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleNewPlaylistCreation = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/dashboard';
    history.push(destination);
  };


  handleDeletePlaylist = (playId) => {
    // console.log('i heard that delete call')
    ListsApiService.getSpotsById(playId)
      .then((data) => {
        if (data.spots.length === 0) {
          ListApiService.deleteLists(playId)
            .then( () => {
              const newUserList = this.state.userList.filter(userlist => userlist.id !== playId)
              
              //added to update setPlaylist context
              this.context.setPlaylist(newUserList)
              
              this.setState({
                userList: newUserList,
                checkLength: data.spots.length
              })   
            })
        }else {
          return this.setState({checkLength: data.spots.length})
        }
      })
      .catch(this.context.setError);
  };

  //get all lists for a specific user
  componentDidMount() {
    // TODO Add api call to return and set in the state the Lists in the city of the user.
    this.setState({
      loading: true
    });
    ListApiService.getUsersLists()
      .then((data) => {
        //this context setPlaylist will pass it to playlist
        this.context.setPlaylist(data)
        // console.log('this is the data from the getUserListApi call =>', data)
        this.setState({
          userList: data
        });
      })
      .catch(this.context.setError);

    ListApiService.getLists()
      .then((data) => {

        this.setState({
          lists: data
        });
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 1000);
      })
      .catch(this.context.setError);
  }

  renderWithLoading = () => {
    const value = {
      playlist: this.state.playlist,
      spots: this.state.spots,
      userList: this.state.userList,
      lists: this.state.lists,
      handleDeletePlaylist: this.handleDeletePlaylist,
      checkLength: this.state.checkLength
    };
    if (this.state.loading) {
      return (
        <div className="loadingContainer">
          <img
            src={loadingAnimation}
            alt="loading"
            className="loadingAnimation"></img>
          <h3 className="loadingText">Loading...</h3>
        </div>
      );
    } else {
      return (
        <div>
          <PlayListContext.Provider value={value}>
            <UserLists
              userList={this.state.userList}
              handleDeletePlaylist={this.handleDeletePlaylist}
              spots={this.state.spots}
              checkLength={this.state.checkLength}
            />            
            <HotIn 
              userList={this.state.userList}
              allLists={this.state.lists}
            />
            <ListByTags lists={this.state.lists} />
          </PlayListContext.Provider>
        </div>
      );
    }
  };

  render() {
    // console.log('playlist', this.context.playlist);
    return <div>{this.renderWithLoading()}</div>;
  }
}

export default UserDashboardRoute;
