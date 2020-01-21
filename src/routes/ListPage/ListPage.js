import React, { Component } from "react";
import ListsApiService from "../../services/lists-api-service";
import SpotsApiService from "../../services/spots-api-service";
import PlayListContext from "../../contexts/PlayListContext";
import Spot from "../../components/Spot/Spot";
import Map from "../../components/Map/Map";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./listPage.css";
import loadingAnimation from "../../components/Assets/loadingAnimation.gif";


export class ListPage extends Component {
  static contextType = PlayListContext;
  state = {
    spots: [],
    listInfo: [],
    userLists:[],
    listName: '',
    loading: false
  };

  handleDeleteSpot = spotId => {
    SpotsApiService.deleteSpots(spotId)
    .then( () => {
      const newSpot = this.state.spots.filter(spot => spot.id !== spotId)
      //added to update context
      this.context.setSpots(newSpot)

      this.setState({
        spots: newSpot
      })
    })
    .catch(this.context.setError);
  }

  renderSpot = () => {
    let usersListsIds = [];
    if(this.state.userLists.length > 0){
      this.state.userLists.map( lists => {
          return usersListsIds.push(lists.list_id)
          
          // console.log('length 1 => lists', lists.length, lists.list_id, lists.users_id)
      })
      return this.state.spots.map(spot => (
        <div id={spot.name}>
          <Spot
            key={Math.random()}
            name={spot.name}
            id={spot.name}
            lid ={this.props.match.params.id}
            sid={spot.id}
            usersListIds={usersListsIds}
            address={spot.address}
            city={spot.city}
            state={spot.state}
            tags={spot.tags}
            handleDeleteSpot = {this.handleDeleteSpot}
          />
        </div>
      ));
    }

  };

  renderListName = () => {

    // if (this.state.listInfo) {
    //   return <h4 className="myListName">{this.state.listInfo.list_name}</h4>;
    // } else {
    //     return <div>{this.state.listName}</div>;
    // }

    if(this.state.listName){
      return <h4 className="myListName">{this.state.listName}</h4>;
    } else if (this.state.listInfo) {
      return <h4 className="myListName">{this.state.listInfo.list_name}</h4>;
    } else {
        return <div>{this.state.listName}</div>;
    }
    
  };

  renderMap = () => {
    return <Map spots={this.state.spots} id="map" />;
  };


  componentDidMount() {
    let id = this.props.match.params.id;
    let plContext = this.context.playlist;

     const listname = plContext.find(pl => pl.id === parseInt(id))
     if(listname) {
      this.setState({
        listName: listname.name
      })
     }

    //TODO:Once Api call is set turn this back on
    this.setState({
      loading: true
    });
    ListsApiService
      .getUsersLists()
      .then(list =>{
        
          // console.log('get userLists', list.list_id)
          // if(list && list.list_id !== undefined) {
          //   //context for userid
          //   // this.context.setUserId(list[0].users_id)
          //   const a  = list.find(l => l.id === parseInt(this.props.match.params.id))
          //   this.context.setListId(a.list_id)       
          // }
         
        this.setState({
          userLists: list
        })
      })
      .catch(this.context.setError)

    ListsApiService.getSpotsById(id)
      .then(spotsServer => {
        //passing spotsServer to setSpots context
        this.context.setSpots(spotsServer)

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
  }

  renderNewSpotButton = () => {
    if(this.state.listName){
      return  (
        <Button>
            <Link
                to={{
                  pathname: "/newSpot",
                  props: {
                      list_id: this.props.match.params.id,
                      sid: this.props.sid
                    }
                  }}
              >
              New Spot
              </Link>
      </Button>
      );
    }
  }

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
          {this.renderNewSpotButton()}

          <div className="spotContainer">
            {this.renderSpot(this.state.spots)}
          </div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderForLoading()}</div>;
  }
}

export default ListPage;
