import React from 'react';
import './Marker.css'

function Marker({text}) {
  return (
    <div>
      <div className="marker">
      </div>
      <p>{text}</p>
    </div>
  )
}

export default Marker
