import React, { Component } from "react";


export class PlayListProvider extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const value = {

        };
        return (
          <PlayListProvider.Provider value={value}>
            {this.props.children}
          </PlayListProvider.Provider>
        );
      }
}


