import React from "react";
import "./Marker.css";
import markerImage from "../../Assets/mapMarker.png";

function Marker({ spotName }) {
  return (
    <div className="markerContainer">
      <img className="markerBackground" src={markerImage} alt="marker"></img>
      <p className="markerText">{spotName}</p>
    </div>
  );
}

export default Marker;
