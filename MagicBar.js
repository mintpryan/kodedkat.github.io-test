import React from 'react'

export default function ({magic, maxMagic}) {

  const containerWidth = 92;
  const percent = magic / maxMagic;
  const fillWidth = containerWidth * percent;


  return (
      <svg className={"MagicBar"} width={98*4} xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 98 9" shapeRendering="crispEdges">
        <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
        <path stroke="#050b00" d="M2 0h94M1 1h1M96 1h1M0 2h1M2 2h94M97 2h1M0 3h1M2 3h1M95 3h1M97 3h1M0 4h1M2 4h1M95 4h1M97 4h1M0 5h1M2 5h1M95 5h1M97 5h1M0 6h1M2 6h94M97 6h1M1 7h1M96 7h1M2 8h94" />
        <path stroke="#ffffff" d="M2 1h94M1 2h1M96 2h1M1 3h1M96 3h1M1 4h1M96 4h1M1 5h1M96 5h1M1 6h1M96 6h1M2 7h94" />
        <path stroke="#393232" d="M3 3h92" />
        <path stroke="#535353" d="M3 4h92M3 5h92" />
        <rect x={3} y={2.5} width={fillWidth} style={{ transition: "width 0.25s"}} height={3} fill={"#87fd15"} />
        <rect x={3} y={4.5} width={fillWidth} style={{ transition: "width 0.25s"}} height={1} fill={"#6fdd05"} />
      </svg>
  )
}

