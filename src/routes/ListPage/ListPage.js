import React, { Component } from "react";
import ListsApiService from "../../services/lists-api-service";
import PlayListContext from "../../contexts/PlayListContext";
import Spot from "../../components/Spot/Spot";
import Map from "../../components/Map/Map";
import "./listPage.css";

export class ListPage extends Component {
  static contextType = PlayListContext;
  state = {
    spots: []
  };

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

  renderMap = () => {
    return <Map spots={this.state.spots} id='map'/>;
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    //TODO:Once Api call is set turn this back on
    ListsApiService.getSpotsById(id)
      .then(spotsServer => {
        this.setState({
          spots: spotsServer.spots
        });
      })
      .catch(this.context.setError);
  }

  render() {
    return (
      <div>
        {this.renderMap()}
        <h4 className='myListName'>List Name</h4>
        {this.renderSpot(this.state.spots)}
      </div>
    );
  }
}

export default ListPage;
