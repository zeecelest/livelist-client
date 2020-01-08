import React, { Component } from "react";
import ListsApiService from '../../services/lists-api-service';
import PlayListContext from '../../contexts/PlayListContext';
import Spot from '../../components/Spot/Spot';


export class ListPage extends Component {
    static contextType = PlayListContext;
spotsFromServer = {  
  list_name: 'list name',
  list_id: 1,
  tags: '#sick #cheap',
  created_by: 'username',
  liked: 10,
  tried: 100,
  spots: [
    {
      id: 1,
      name: 'spots name',
      tags: '#bestdrinks #goodmusic',
      address: '361 fake st.',
      city: 'city name',
      state: 'ST',
      lat: 12.091823,
      lng: 31.31525
    },
    {
      id: 1,
      name: 'spots name',
      tags: '#bestdrinks #goodmusic',
      address: '361 fake st.',
      city: 'city name',
      state: 'ST',
      lat: 12.091823,
      lng: 31.31525
    },
    {
      id: 1,
      name: 'spots name',
      tags: '#bestdrinks #goodmusic',
      address: '361 fake st.',
      city: 'city name',
      state: 'ST',
      lat: 12.091823,
      lng: 31.31525
    },
  ]
}

spots = this.spotsFromServer.spots
renderSpot=(spots)=>{
  console.log(spots)
  return spots.map(spot => 
  <Spot 
    key={Math.random()}
    name={spot.name}
    address={spot.address}
    city={spot.city}
    state={spot.state}
    tags={spot.tags}
  />
)
}


componentDidMount(){
    let id = this.props.match.params.id;
    // ListsApiService.getSpotsById(id)
    // .then(spots => {
    //   console.log(spots)
    //   //this.context.setSpots(spots.spots)
    // })
    // .catch(this.context.setError)
}

  render() {
    return (
      <div>
        <h1>My List</h1>
        {this.renderSpot(this.spots)}
      </div>
    );
  }
}

export default ListPage;
