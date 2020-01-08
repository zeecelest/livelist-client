import React, { Component } from "react";


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

  render() {
    const value = {
      playlist: this.state.playlist,
      spots: this.state.spots,
      setPlaylist: this.setPlaylist,
      setSpots: this.setSpots,
    };
    return (
      <PlayListContext.Provider value={value}>
        {this.props.children}
      </PlayListContext.Provider>
    );
  }
}
