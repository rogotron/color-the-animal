import React from 'react'
import { COLORS } from '../colors'

export default function ColorPalette({ selectedColor, onSelect }) {
  return (
    <div className="palette" role="radiogroup" aria-label="Color palette">
      <div className="palette-scroll">
        {COLORS.map(({ name, hex }) => {
          const isSelected = hex.toLowerCase() === selectedColor.toLowerCase()
          return (
            <button
              key={hex}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={name}
              title={name}
              className={`swatch${isSelected ? ' swatch-selected' : ''}${hex.toLowerCase() === '#ffffff' ? ' swatch-white' : ''}`}
              style={{ background: hex }}
              onClick={() => onSelect(hex)}
            />
          )
        })}
      </div>
    </div>
  )
}
