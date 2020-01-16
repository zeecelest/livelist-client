import React from "react";
import "./Map.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker/Marker";
import MyLocation from "./MyLocation/MyLocation";
import PlayListContext from "../../contexts/PlayListContext";

class Map extends React.Component {
  static contextType = PlayListContext;
  constructor(props) {
    
    super(props);
    this.myRef = React.createRef();
    this.state = {
      myLocation: { lat: "", lng: "" },
      center: { lat: 32.72, lng: -117.16 },
      zoom: 15,
      spots: [],
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
  /*This is a quick center,  better centerlist will be made later.*/
  centerList = () => {
    let lat = 0;
    let lng = 0;
    this.props.spots.forEach(place => {
      lat += parseFloat(place.lat);
      lng += parseFloat(place.lng);
    });
    lat = lat / this.props.spots.length;
    lng = lng / this.props.spots.length;
    this.setState({
      center: {
        lat,
        lng
      }
    });
  };

  render() {
    return (
      <div
        style={{ height: "30vh", width: "100vw", margin: "10vh auto" }}
        className="map"
      >
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
          {this.props.spots.map(x => {
            return (
              <Marker
                key={Math.random()}
                lat={x.lat}
                lng={x.lng}
                reference={this.input}
                handleClick={this.handleClick}
                spotName={x.name}
              />
            );
          })}
        </GoogleMapReact>
        <button onClick={e => this.handleButton(e)} className='mapButton'>Current</button>
        <button className='mapButton' onClick={f => this.centerList(f)}>Center</button>
      </div>
    );
  }
}

export default Map;
