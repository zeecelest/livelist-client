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
      zoom: 10,
      spots: [],
    };
  }
 

  findMyLocation = () => {
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
  };

  handleButton = e => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(x => {
      const lat = x.coords.latitude;
      const lng = x.coords.longitude;
      this.setState({
        ...this.state,
        center: {
          lat,
          lng
        },
        myLocation:{
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

  handleApiLoaded = async (map, maps) => {
    let lat = 0;
    let lng = 0;
    let glat = 0;
    let glng = 0;

    this.props.spots.forEach(place => {
      lat += parseFloat(place.lat);
      lng += parseFloat(place.lng);
    });
    lat = lat / this.props.spots.length;
    lng = lng / this.props.spots.length;

    navigator.geolocation.getCurrentPosition(x => {
      glat = x.coords.latitude;
      glng = x.coords.longitude;
    });
      this.setState({
        ...this.state,
        myLocation: {lat: glat, lng: glng},
        center: {lat, lng}
      }) 

  }

  mapOptions = () => {
    return {
      fullscreenControl: false,
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#2a3b2e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#d1d1d1'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d1d1d1'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d91a6a'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d1d1d1'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#4f546a'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#d91a6a'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d1d1d1'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d1d1d1'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d1d1d1'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#d1d1d1'}]
            }
          ]

    }
  }

  render() {
    return (
      <div
        style={{ height: "40vh", width: "100vw", margin: "30px 0 10vh 0" }}
        className="map"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
          defaultZoom={this.state.zoom}
          center={this.state.center}
          onChange={x => this.handleMapDrag(x)}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) => this.handleApiLoaded(map, maps)}
          options={this.mapOptions}
          fullscreenControl='false'
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
