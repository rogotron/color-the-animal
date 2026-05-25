import React, { useCallback, useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'

import { ANIMALS, ANIMALS_BY_ID } from './animalData'
import { COLORS } from './colors'
import { loadFills, saveFills, loadAnimalId, saveAnimalId, loadColor, saveColor } from './storage'

import AnimalCanvas from './components/AnimalCanvas'
import ColorPalette from './components/ColorPalette'
import Toolbar from './components/Toolbar'
import AnimalPicker from './components/AnimalPicker'
import Gallery from './components/Gallery'
import ConfirmModal from './components/ConfirmModal'

const DEFAULT_ANIMAL = ANIMALS[0].id
const DEFAULT_COLOR = COLORS[4].hex
const UNDO_LIMIT = 10

export default function App() {
  const [fillsByAnimal, setFillsByAnimal] = useState(() => loadFills())
  const [animalId, setAnimalId] = useState(() => {
    const stored = loadAnimalId(DEFAULT_ANIMAL)
    return ANIMALS_BY_ID[stored] ? stored : DEFAULT_ANIMAL
  })
  const [selectedColor, setSelectedColor] = useState(() => loadColor(DEFAULT_COLOR))
  const [historyByAnimal, setHistoryByAnimal] = useState({})
  const [showPicker, setShowPicker] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const celebratedRef = useRef(new Set())

  const animal = ANIMALS_BY_ID[animalId]
  const fills = fillsByAnimal[animalId] || {}
  const history = historyByAnimal[animalId] || []

  // Persist on changes
  useEffect(() => { saveFills(fillsByAnimal) }, [fillsByAnimal])
  useEffect(() => { saveAnimalId(animalId) }, [animalId])
  useEffect(() => { saveColor(selectedColor) }, [selectedColor])

  const triggerConfetti = useCallback(() => {
    const burst = (origin) => confetti({
      particleCount: 70,
      spread: 75,
      startVelocity: 45,
      ticks: 220,
      origin,
      colors: COLORS.filter(c => c.hex !== '#ffffff').map(c => c.hex),
      disableForReducedMotion: false,
    })
    burst({ x: 0.2, y: 0.6 })
    burst({ x: 0.8, y: 0.6 })
    setTimeout(() => burst({ x: 0.5, y: 0.4 }), 180)
  }, [])

  const handleRegionClick = useCallback((regionId) => {
    setHistoryByAnimal(prev => {
      const prior = prev[animalId] || []
      const nextEntry = { regionId, prevColor: fills[regionId] }
      const trimmed = [...prior, nextEntry].slice(-UNDO_LIMIT)
      return { ...prev, [animalId]: trimmed }
    })
    setFillsByAnimal(prev => {
      const next = { ...(prev[animalId] || {}) }
      next[regionId] = selectedColor
      const merged = { ...prev, [animalId]: next }

      // Check for completion (after this fill)
      const allFilled = animal.regions.every(r => next[r] !== undefined)
      if (allFilled && !celebratedRef.current.has(animalId)) {
        celebratedRef.current.add(animalId)
        // Defer to next tick so DOM updates first
        setTimeout(triggerConfetti, 60)
      }
      return merged
    })
  }, [animalId, fills, selectedColor, animal.regions, triggerConfetti])

  const handleUndo = useCallback(() => {
    setHistoryByAnimal(prev => {
      const prior = prev[animalId] || []
      if (prior.length === 0) return prev
      const last = prior[prior.length - 1]
      const newHistory = prior.slice(0, -1)

      setFillsByAnimal(fp => {
        const cur = { ...(fp[animalId] || {}) }
        if (last.prevColor === undefined) {
          delete cur[last.regionId]
        } else {
          cur[last.regionId] = last.prevColor
        }
        // If we undid past completion, allow re-celebration on next completion
        const stillAll = animal.regions.every(r => cur[r] !== undefined)
        if (!stillAll) celebratedRef.current.delete(animalId)
        return { ...fp, [animalId]: cur }
      })

      return { ...prev, [animalId]: newHistory }
    })
  }, [animalId, animal.regions])

  const handleClear = useCallback(() => {
    setFillsByAnimal(prev => ({ ...prev, [animalId]: {} }))
    setHistoryByAnimal(prev => ({ ...prev, [animalId]: [] }))
    celebratedRef.current.delete(animalId)
    setShowClearConfirm(false)
  }, [animalId])

  const handlePickAnimal = useCallback((id) => {
    setAnimalId(id)
    setShowPicker(false)
    setShowGallery(false)
  }, [])

  const canUndo = history.length > 0
  const canClear = Object.keys(fills).length > 0

  return (
    <div className="app">
      <Toolbar
        animalName={animal.name}
        onUndo={handleUndo}
        canUndo={canUndo}
        onClear={() => setShowClearConfirm(true)}
        canClear={canClear}
        onOpenPicker={() => setShowPicker(true)}
        onOpenGallery={() => setShowGallery(true)}
      />

      <main className="canvas-area">
        <AnimalCanvas
          animal={animal}
          fills={fills}
          onRegionClick={handleRegionClick}
        />
      </main>

      <footer className="palette-area">
        <ColorPalette
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      </footer>

      {showPicker && (
        <AnimalPicker
          activeId={animalId}
          fillsByAnimal={fillsByAnimal}
          onPick={handlePickAnimal}
          onClose={() => setShowPicker(false)}
        />
      )}

      {showGallery && (
        <Gallery
          fillsByAnimal={fillsByAnimal}
          onPick={handlePickAnimal}
          onClose={() => setShowGallery(false)}
        />
      )}

      {showClearConfirm && (
        <ConfirmModal
          title="Clear this animal?"
          message="All the colors will go away."
          confirmLabel="Yes, clear it"
          cancelLabel="No, keep it"
          onConfirm={handleClear}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  )
}
