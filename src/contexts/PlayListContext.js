import React, { Component } from "react";
import SpotsApiService from '../services/spots-api-service';

const PlayListContext = React.createContext({
  playlist: {},
  spots:[],
  userLists:[],
  setPlaylist: () => {},
  setSpots: () => {},
  spotid: 0,
  listid: 0,
});

export default PlayListContext;

export class PlayListProvider extends Component {

  constructor(props) {
    super(props);
    const state = { playlist: {}, spots: [] };
    this.state = state;
  }


  setPlaylist = playlist => {
    this.setState({ playlist });
  };

  setSpots = spots => {
    this.setState( { spots } );
  };

  setSpotId = id => {
    this.setState({ spotid: id})
  }

  setListId = id => {
    this.setState({ listid: id})
  }

  handleAddSpot = spot => {
    this.setState({
      spots: [...this.state.spots, spot]
    })
  }
  
  handleUpdateSpot = (spot) => {
    let currentSpot = this.state.spots.spots.find( s => s.id === spot.id)
    SpotsApiService.patchSpot(spot)
    .then( data => {
      this.setState({
        spots: currentSpot
      })
    })
    .catch(this.context.setError)
  }

  render() {
    const value = {
      playlist: this.state.playlist,
      spots: this.state.spots,
      setPlaylist: this.setPlaylist,
      setSpots: this.setSpots,
      setUserList: this.setUserList,
      handleAddSpot: this.handleAddSpot,
      handleUpdateSpot: this.handleUpdateSpot,
      spotid: this.state.spotid,
      setSpotId: this.setSpotId,
      listid: this.state.listid,
      setListId: this.setListId
    };
    return (
      <PlayListContext.Provider value={value}>
        {this.props.children}
      </PlayListContext.Provider>
    );
  }
}
