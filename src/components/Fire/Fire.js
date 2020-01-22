import React from "react";
import "./Fire.css";
import fire from "./fire.png"
import fireAnimation from "./fire.gif"

const Fire = (props) => {
  return (
    <div className="fire-container">
      <div>
        <img src={fireAnimation} className="fire"/>
        <p className='firetext'>HOT LIST!</p>
      </div>
    </div>
)
}

export default Fire;
