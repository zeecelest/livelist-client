import React, { Component } from "react";
import SpotsApiService from '../services/spots-api-service';

const PlayListContext = React.createContext({
  playlist: {},
  spots:[],
  setPlaylist: () => {},
  setSpots: () => {}
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
    this.setState( {spots} );
  };

  handleUpdateSpot = (spot) => {
    console.log('handle edit spot in PlayList Contextt', spot)
    let spotJson = JSON.stringify(spot)
    console.log('handle update PlayList Context', spotJson)
    SpotsApiService.patchSpot(spotJson)
    .then( data => {
     console.log('patch' , data)
    // })
    // .then( () => {
    //   console.log('current spot', currentSpot)
    //   this.setState({
    //     spots: currentSpot
    //   })
    })
    .catch(this.context.setError)
  }

  render() {
    const value = {
      playlist: this.state.playlist,
      spots: this.state.spots,
      setPlaylist: this.setPlaylist,
      setSpots: this.setSpots,
      handleUpdateSpot: this.handleUpdateSpot
    };
    return (
      <PlayListContext.Provider value={value}>
        {this.props.children}
      </PlayListContext.Provider>
    );
  }
}
