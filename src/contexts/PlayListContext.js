import React, { Component } from "react";



const PlayListContext = React.createContext({
  user: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {}
});

export default PlayListContext;


export class PlayListProvider extends Component {


  render() {
    const value = {};
    return (
      <PlayListProvider.Provider value={value}>
        {this.props.children}
      </PlayListProvider.Provider>
    );
  }
}
