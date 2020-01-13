import React, { Component } from "react";
import ListsApiService from "../../services/lists-api-service";
import PlayListContext from "../../contexts/PlayListContext";
import Spot from "../../components/Spot/Spot";
import Map from "../../components/Map/Map";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./listPage.css";

export class ListPage extends Component {
  static contextType = PlayListContext;
  state = {
    spots: []
  };

  renderSpot = () => {
    console.log('user_id listpage' + this.props.user_id)
    return this.state.spots.map(spot => (
        <Spot
        key={Math.random()}
        id={spot.id}
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
    console.log('id comdidmount' +id )
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
    console.log(this.props)
    console.log(this.state)
    console.log(this.context)
    console.log(this.props.user_id)
    return (
      <div>
        {this.renderMap()}
        <h4 className='myListName'>List Name</h4>
        {this.renderSpot(this.state.spots)}
        <Button>
          <Link 
            to={{
              pathname: '/newSpot',
              props: {
                list_id: this.props.match.params.id
              }
            }}
          >New Spot</Link>
        </Button>
      </div>
      
    );
  }
}

export default ListPage;
