import React, { Component } from "react";
import ListsApiService from "../../services/lists-api-service";
import PlayListContext from "../../contexts/PlayListContext";
import Spot from "../../components/Spot/Spot";
import Map from "../../components/Map/Map";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./listPage.css";
import ScrollContainer from 'react-indiana-drag-scroll';

export class ListPage extends Component {
  static contextType = PlayListContext;
  state = {
    spots: [],
    listInfo: []
  };

  renderSpot = () => {
    return this.state.spots.map(spot => (
      <div id={spot.name}>
        <Spot
          key={Math.random()}
          name={spot.name}
          id={spot.name}
          address={spot.address}
          city={spot.city}
          state={spot.state}
          tags={spot.tags}
        />
      </div>
    ));
  };

  renderListName = () =>{
    if(this.state.listInfo){
    return (<h4 className="myListName">{this.state.listInfo.list_name}</h4>)
    }
    else {
      return (<div> </div>)
    }
  }

  renderMap = () => {
    return <Map spots={this.state.spots} id="map" />;
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    //TODO:Once Api call is set turn this back on
    ListsApiService.getSpotsById(id)
      .then(spotsServer => {
        this.setState({
          spots: spotsServer.spots,
          listInfo: spotsServer
        });
      })
      .catch(this.context.setError);
  }

  render() {

    console.log('this is the state on the list page',this.state);

    return (
      <div>
        {this.renderMap()}
        {this.renderListName()}
      <div className='spotContainer'>
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
}

export default ListPage;
