import React, { Component } from "react";
import ListsApiService from "../../services/lists-api-service";
import PlayListContext from "../../contexts/PlayListContext";
import Spot from "../../components/Spot/Spot";
import Map from "../../components/Map/Map";

export class ListPage extends Component {
  static contextType = PlayListContext;
  state = {
    spots: []
  }



  renderSpot = () => {
    return this.state.spots.map(spot => (
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
    ListsApiService.getSpotsById(id)
      .then(spotsServer => {
        console.log(spotsServer)
        this.setState({
          spots: spotsServer.spots
        })
      })
      .catch(this.context.setError);
  }

  render() {
    return (
      <div>
        <h1>My List</h1>
        <Map spots={this.state.spots} />
        {this.renderSpot(this.state.spots)}
      </div>
    );
  }
}

export default ListPage;
