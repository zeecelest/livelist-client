import React from "react";
import "./Map.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker/Marker";
import MyLocation from "./MyLocation/MyLocation";
import spots from "./fixtures.js";
import PlayListContext from "../../contexts/PlayListContext";
//const AnyReactComponent = ({text}) => (
//  <div style={{height: '10px', width: '10px', border: '1px solid black'}}>
//    {text}
//  </div>
//);

class Map extends React.Component {
  static contextType = PlayListContext;
  constructor(props) {
    super(props);

    this.state = { 
      myLocation: { lat: '', lng: '', }, 
      center: { lat: 32.72, lng: -117.16, }, 
      zoom: 15, 
      spots: [this.props.spots], 
    };
  }


    findMyLocation = () => {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(x => {
          const lat = x.coords.latitude;
          const lng = x.coords.longitude;
          this.setState({
            ...this.state,
            myLocation: {
              lat,
              lng
            }
          });
        });
      }, 5000);
    };

    handleButton = e => {
      e.preventDefault();
      this.findMyLocation();
      navigator.geolocation.getCurrentPosition(x => {
        const lat = x.coords.latitude;
        const lng = x.coords.longitude;
        this.setState({
          ...this.state,
          center: {
            lat,
            lng
          }
        });
      });
    };

    handleMapDrag = e => {
      const lat = e.center.lat;
      const lng = e.center.lng;
      this.setState({
        ...this.state,
        center: {
          lat,
          lng
        }
      });
    };
  
  render() { console.log(process.env.REACT_APP_API_KEY )
    console.log('Context spots',this.context.spots)
    console.log('state',this.state)
    return (
      <div style={{ height: "50vh", width: "50%", margin: "25vh auto" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
          defaultZoom={this.state.zoom}
          center={this.state.center}
          onChange={x => this.handleMapDrag(x)}
        >
          <MyLocation
            lat={this.state.myLocation.lat}
            lng={this.state.myLocation.lng}
          />

          {this.state.spots.map(x => {
            return <Marker lat={x.lat} lng={x.lng} text={x.text} />;
          })}
        </GoogleMapReact>
        <button onClick={e => this.handleButton(e)}>Current</button>
      </div>
    );
  }
}

export default Map;
