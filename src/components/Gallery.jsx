import React from 'react'
import { ANIMALS } from '../animalData'

export default function Gallery({ fillsByAnimal, onPick, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>My gallery</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="gallery-grid">
          {ANIMALS.map(animal => {
            const fills = fillsByAnimal[animal.id] || {}
            const filledCount = animal.regions.filter(r => fills[r] !== undefined).length
            const complete = filledCount === animal.regions.length
            return (
              <button
                key={animal.id}
                type="button"
                className={`gallery-card${complete ? ' gallery-card-complete' : ''}`}
                onClick={() => onPick(animal.id)}
              >
                <svg
                  viewBox={animal.viewBox}
                  preserveAspectRatio="xMidYMid meet"
                  className="gallery-svg"
                  aria-hidden="true"
                >
                  {animal.render({ fills, onRegionClick: () => {}, interactive: false })}
                </svg>
                <span className="gallery-label">
                  {animal.name}
                  {complete && <span className="gallery-star" aria-label="Complete"> ★</span>}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
