import React from "react";
import "./MyLocation.css";
import markerImage from "../../Assets/currentLocationAnimation.gif";

function MyLocation() {
  return (
    <div className="myLocation">
      <img className="myLocationIcon" src={markerImage} alt="marker"></img>
    </div>
  );
}

export default MyLocation;
