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
import LikeButton from "../../components/LikeButton/likeButton";

export class ListPage extends Component {
  static contextType = PlayListContext;
  state = {
    spots: [],
    listInfo: [],
    userLists: [],
    listName: "",
    listLikes: [],
    loading: false
  };

  handleDeleteSpot = spotId => {
    SpotsApiService.deleteSpots(spotId)
      .then(() => {
        const newSpot = this.state.spots.filter(spot => spot.id !== spotId);
        //added to update context
        this.context.setSpots(newSpot);

        this.setState({
          spots: newSpot
        });
      })
      .catch(this.context.setError);
  };

  renderSpot = () => {
    let usersListsIds = [];
    if (this.state.userLists.length > 0) {
      this.state.userLists.map(lists => {
        return usersListsIds.push(lists.list_id);

        // console.log('length 1 => lists', lists.length, lists.list_id, lists.users_id)
      });
      return this.state.spots.map(spot => (
        <div id={spot.name}>
          <Spot
            key={Math.random()}
            name={spot.name}
            id={spot.name}
            lid={this.props.match.params.id}
            sid={spot.id}
            usersListIds={usersListsIds}
            address={spot.address}
            city={spot.city}
            state={spot.state}
            tags={spot.tags}
            handleDeleteSpot={this.handleDeleteSpot}
          />
        </div>
      ));
    }
  };

  renderListName = () => {
    if (this.state.listName) {
      return (
        <div >
      <h4 className="myListName">{this.state.listName}
      <LikeButton 
        id={this.props.match.params.id} 
        handleLikeButton={this.handleLikeButton}
        liked={this.state.listLikes.liked_by_user} 
        likes={this.state.listLikes.likes} />
       </h4> 
      </div>
      );
    } 
    // else if (this.state.listInfo) {
    //   return (
    //     <div className='listNameContainer'>
    //   <h4 className="myListName">{this.state.listInfo.list_name}</h4>
    //   <LikeButton 
    //     id={this.props.match.params.id} 
    //     handleLikeButton={this.handleLikeButton}
    //     liked={this.state.listLikes.liked_by_user} 
    //     likes={this.state.listLikes.likes}/>
    //   </div>
    //   );
    // } else {
    //   return (
    //   <div className='listNameContainer'>
    //     <h4 className="myListName">{this.state.listName}</h4>
    //     <LikeButton
    //     id={this.props.match.params.id} 
    //     handleLikeButton={this.handleLikeButton}
    //     liked={this.state.listLikes.liked_by_user} 
    //     likes={this.state.listLikes.likes}/>
    //     </div>
    //   );
    // }
  };

  renderMap = () => {
    return <Map spots={this.state.spots} id="map" />;
  };

  handleLikeButton = ev => {
    ev.preventDefault();
    let id = ev.target.id;
    ListsApiService.toggleLike(id)
      .then(like => {
        return this.setState({
          state: !this.state.updated
        });
      })
      .catch(() => console.log("error"));
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    // let plContext = this.context.playlist;

    //  const listname = plContext.find(pl => pl.id === parseInt(id))
    //  if(listname) {
    //   this.setState({
    //     listName: listname.name
    //   })
    //  }

    // //TODO:Once Api call is set turn this back on
    this.setState({
      loading: true
    });

    ListsApiService.getUsersLists()
      .then(list => {
        let listName;
        console.log('this is in the getUserLists =>', list)
        for (let i = 0; i < list.length; i++) {
          if (list[i].id == this.props.match.params.id) {
            listName = list[i].name;
            console.log('this is the listName value =>', listName)
            this.setState({
              listName: listName
            })
          }
        }
        this.setState({
          userLists: list
        });

      })
      .catch(this.context.setError);

    //Find the list of the id
    // set the state of Liked_by_user and likes
    ListsApiService.getLists()
      .then(data => {
        let listLikeInfo = {};
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == this.props.match.params.id) {
            listLikeInfo.liked_by_user = data[i].liked_by_user;
            listLikeInfo.likes = data[i].likes;
          }
        }
        this.setState({
          listLikes: listLikeInfo
        });
      })
      .catch(this.context.setError);

    ListsApiService.getSpotsById(id)
      .then(spotsServer => {
        //passing spotsServer to setSpots context
        this.context.setSpots(spotsServer);
        console.log("spots from server =>", spotsServer);
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
    if (this.state.listName) {
      return (
        <Button className='newSpotButton'>
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
  };

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
