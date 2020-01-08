import React, { Component } from "react";
import ListsApiService from "../../services/lists-api-service";
import PlayListContext from "../../contexts/PlayListContext";
import Spot from "../../components/Spot/Spot";
import Map from "../../components/Map/Map";

export class ListPage extends Component {
  static contextType = PlayListContext;

  spotsFromServer = {
    list_name: "list name",
    list_id: 1,
    tags: "#sick #cheap",
    created_by: "username",
    liked: 10,
    tried: 100,
    spots: [
      {
        id: 1,
        name: "spots name",
        tags: "#bestdrinks #goodmusic",
        address: "361 fake st.",
        city: "city name",
        state: "ST",
        lat: 12.091823,
        lng: 31.31525
      },
      {
        id: 1,
        name: "spots name",
        tags: "#bestdrinks #goodmusic",
        address: "361 fake st.",
        city: "city name",
        state: "ST",
        lat: 12.091823,
        lng: 31.31525
      },
      {
        id: 1,
        name: "spots name",
        tags: "#bestdrinks #goodmusic",
        address: "361 fake st.",
        city: "city name",
        state: "ST",
        lat: 12.091823,
        lng: 31.31525
      },
      {
        id: 1,
        name: "home",
        tags: "#bestdrinks #goodmusic",
        address: "361 fake st.",
        city: "city name",
        state: "ST",
        lat: 34.001522,
        lng: -118.437215
      }
    ]
  };


  renderSpot = () => {
    return this.spotsFromServer.spots.map(spot => (
      <Spot
        key={Math.random()}
        name={spot.name}
        address={spot.address}
        city={spot.city}
        state={spot.state}
        tags={spot.tags}
      />
    ));
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    //TODO:Once Api call is set turn this back on
    // ListsApiService.getSpotsById(id)
    //   .then(spotsServer => {
    //     this.context.setSpots(spotsServer);
    //   })
    //   .catch(this.context.setError);
  }

  render() {
    return (
      <div>
        <h1>My List</h1>
        {/* After API is set change these to props or context */}
        {/* <Map spots={this.spotsFromServer.spots} /> */}
        {this.renderSpot(this.spotsFromServer)}
      </div>
    );
  }
}

export default ListPage;
