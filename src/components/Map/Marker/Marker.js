import React, {Component} from "react";
import "./Marker.css";
import cx from "classnames";
import markerImage from "../../Assets/mapMarker.png";

export class Marker extends Component {
 input = React.createRef();
 handleClick = () => {
  // console.log('this is the input reference', this.input.current);
  
}
  render(){
    return (
    <div className="markerContainer">
      <img className="markerBackground" src={markerImage} alt="marker" ></img>
      <a href={`#${this.props.spotName}`} className="markerText" ref={this.input} onClick={() => this.handleClick()}>{this.props.spotName}</a>
    </div>
  );
  }
}

export default Marker;


// function Marker({ spotName, handleClick, reference }) {
//   return (
//     <div className="markerContainer">
//       <img className="markerBackground" src={markerImage} alt="marker" ></img>
//       <p className="markerText" id={spotName} ref={reference} onClick={handleClick}>{spotName}</p>
//     </div>
//   );
// }

// export default Marker;
