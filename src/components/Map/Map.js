import React from 'react';
import './Map.css';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker';
import spots from './fixtures.js'

/*EXAMPLE*/
//const AnyReactComponent = ({text}) => (
//  <div style={{height: '10px', width: '10px', border: '1px solid black'}}>
//    {text}
//  </div>
//);

class App extends React.Component {
  static defaultProps = {
    center: {
      lat: 32.72,
      lng: -117.16,
    },
    zoom: 10,
    spots: [...spots]
  };

  render() {
    console.log(this.props.spots)
    return (
      <div style={{height: '50vh', width: '50%', margin: '25vh auto'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: process.env.REACT_APP_API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
          {this.props.spots.map(x => {
            return (
            <Marker lat={x.lat}
                    lng={x.lng}
                    text={x.text}
                  />
            )
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default App;
