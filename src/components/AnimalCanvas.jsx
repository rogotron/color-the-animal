import React from 'react'

export default function AnimalCanvas({ animal, fills, onRegionClick }) {
  return (
    <div className="canvas-wrap">
      <svg
        className="animal-svg"
        viewBox={animal.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-label={animal.name}
      >
        {animal.render({ fills, onRegionClick, interactive: true })}
      </svg>
    </div>
  )
}
