import React from 'react';
import {Rupee} from './icons';

export default function(props) {

  let color = "inherit";
  if (props.rupees >= props.maxRupees) {
    color = "#136743" //"green";
  } else if (props.rupees === 0) {
    color = "gray";
  }

  return (
    <div style={{display: "flex", alignItems: "center"}}>
      <Rupee width={30} />
      <span style={{color, fontSize: "3em", marginLeft: "0.25em"}}>{props.rupees}</span>
    </div>
  )
}