import React from 'react'

const IconUndo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M9 14 4 9l5-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 9h9a6 6 0 0 1 0 12h-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconClear = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconAnimals = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <circle cx="12" cy="13" r="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="6" cy="9" r="2" fill="currentColor" />
    <circle cx="18" cy="9" r="2" fill="currentColor" />
    <circle cx="8" cy="5" r="1.8" fill="currentColor" />
    <circle cx="16" cy="5" r="1.8" fill="currentColor" />
  </svg>
)

const IconGallery = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <rect x="3" y="3" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
  </svg>
)

export default function Toolbar({
  animalName,
  onUndo, canUndo,
  onClear, canClear,
  onOpenPicker, onOpenGallery,
}) {
  return (
    <header className="toolbar">
      <h1 className="animal-name">{animalName}</h1>
      <div className="toolbar-actions">
        <button
          type="button"
          className="tool-btn"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Undo"
          title="Undo"
        >
          <IconUndo />
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={onClear}
          disabled={!canClear}
          aria-label="Clear animal"
          title="Clear"
        >
          <IconClear />
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={onOpenGallery}
          aria-label="Gallery"
          title="Gallery"
        >
          <IconGallery />
        </button>
        <button
          type="button"
          className="tool-btn tool-btn-primary"
          onClick={onOpenPicker}
          aria-label="Pick animal"
          title="Pick animal"
        >
          <IconAnimals />
        </button>
      </div>
    </header>
  )
}
