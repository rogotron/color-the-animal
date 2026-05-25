import React from 'react'
import { ANIMALS } from '../animalData'

export default function AnimalPicker({ activeId, fillsByAnimal, onPick, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Pick an animal</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="picker-grid">
          {ANIMALS.map(animal => {
            const fills = fillsByAnimal[animal.id] || {}
            return (
              <button
                key={animal.id}
                type="button"
                className={`picker-card${animal.id === activeId ? ' picker-card-active' : ''}`}
                onClick={() => onPick(animal.id)}
              >
                <svg
                  viewBox={animal.viewBox}
                  preserveAspectRatio="xMidYMid meet"
                  className="picker-svg"
                  aria-hidden="true"
                >
                  {animal.render({ fills, onRegionClick: () => {}, interactive: false })}
                </svg>
                <span className="picker-label">{animal.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
