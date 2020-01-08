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

  spots = [];

  renderSpot = spots => {
    return spots.map(spot => (
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
    ListsApiService.getSpotsById(id)
      .then(spotsServer => {
        this.context.setSpots(spotsServer);
      })
      .catch(this.context.setError);
  }

  render() {
    return (
      <div>
        <h1>My List</h1>
        <Map spots={this.spots} />
        {console.log('Spots in the context',this.context.spots)}
      </div>
    );
  }
}

export default ListPage;
