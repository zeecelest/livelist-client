import React, { Component } from "react";
import ListsApiService from "../../services/lists-api-service";
import SpotsApiService from "../../services/spots-api-service";
import PlayListContext from "../../contexts/PlayListContext";
import Spot from "../../components/Spot/Spot";
import Map from "../../components/Map/Map";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./listPage.css";
import ScrollContainer from "react-indiana-drag-scroll";
import loadingAnimation from "../../components/Assets/loadingAnimation.gif";

export class ListPage extends Component {
  static contextType = PlayListContext;
  state = {
    spots: [],
    listInfo: [],
    userLists:[],
    loading: false
  };

  handleDeleteSpot = spotId => {
    // console.log('handle delete for spot in user dashboard')
    SpotsApiService.deleteSpots(spotId)
    .then( () => {
      console.log(`Record '${spotId}' deleted`)
      const newSpot = this.state.spots.filter(spot => spot.id !== spotId)
      this.setState({
        spots: newSpot
      })
    })
    .catch(this.context.setError);
  }

  renderSpot = () => {
<<<<<<< HEAD
    console.log('user_id listpage' + this.props.user_id)
    return this.state.spots.map(spot => (

      <div id={spot.name} key={spot.id}>
        <Spot
          // userlistId = {this.state.listInfo.list_id}
          usersid = {this.state.listInfo.name}
          lid = {this.props.match.params.id}
          sid = {spot.id}
          key={Math.random()}
          name={spot.name}
          address={spot.address}
          city={spot.city}
          state={spot.state}
          tags={spot.tags}
          handleDeleteSpot = {this.handleDeleteSpot}
        />
      </div>
    ));
=======
    console.log('state of userList in spots',this.state.userLists)
    let usersListsIds = [];
    if(this.state.userLists.length > 0){
      this.state.userLists.map(lists =>{
        console.log('another thing',lists.list_id)
        usersListsIds.push(lists.list_id)
      })
      console.log('updatedList with only ids', usersListsIds)
      return this.state.spots.map(spot => (
        <div id={spot.name}>
          <Spot
            key={Math.random()}
            name={spot.name}
            id={spot.name}
            usersListIds={usersListsIds}
            address={spot.address}
            city={spot.city}
            state={spot.state}
            tags={spot.tags}
          />
        </div>
      ));
    }

>>>>>>> 2878983ac1e48b058d1726562c2f8c53c689872c
  };

  renderListName = () => {
    if (this.state.listInfo) {
      return <h4 className="myListName">{this.state.listInfo.list_name}</h4>;
    } else {
      return <div> </div>;
    }
  };

  renderMap = () => {
    return <Map spots={this.state.spots} id="map" />;
  };


  componentDidMount() {
    let id = this.props.match.params.id;
    // console.log('id comdidmount' +id )
    //TODO:Once Api call is set turn this back on
    this.setState({
      loading: true
    });
    ListsApiService
      .getUsersLists()
      .then(list =>{
        this.setState({
          userLists: list
        })
      })
      .catch(this.context.setError)

    ListsApiService.getSpotsById(id)
      .then(spotsServer => {
        this.setState({
          spots: spotsServer.spots,
          listInfo: spotsServer
        });
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 1000);
      })
      .catch(this.context.setError);

      // ListsApiService.getUsersLists()
      // .then(data => {
      //   console.log('data from the server on userList call', data)
      //     this.setState({
      //        userList: data
      //     })
      // })
      // .catch(this.context.setError);
    
      // const userListId = this.state.userList.map(list => list.list_id == this.props.match.params.id)
      // console.log('user list id ' , userListId)
  }

<<<<<<< HEAD
  render() {
    // console.log('this is the state on the list page',this.state);
    // console.log('list page cnt' + this.state.spots.length ? this.state.spots.length : 0);
    console.log('list info' + this.state.listInfo)
    // const lid = this.listInfo.find(x => x.list_id === '34')
    // console.log('lid ', lid)
    // console.log('list info list=> ' + this.state.listInfo.map(list => list.list_id === this.props.match.params.id))
    return (
      <div>

        {this.renderMap()}
      
        {this.renderListName()}
=======
  renderForLoading = () => {
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
          {this.renderMap()}
          {this.renderListName()}
          <div className="spotContainer">
            {this.renderSpot(this.state.spots)}
          </div>
          <Button>
            <Link
              to={{
                pathname: "/newSpot",
                props: {
                  list_id: this.props.match.params.id
                }
              }}
            >
              New Spot
            </Link>
          </Button>
        </div>
      );
    }
  };
>>>>>>> 2878983ac1e48b058d1726562c2f8c53c689872c

  render() {
    return <div>{this.renderForLoading()}</div>;
  }
}

export default ListPage;
