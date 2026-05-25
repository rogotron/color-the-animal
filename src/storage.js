// localStorage helpers — fail silently if storage is unavailable.

const FILLS_KEY = 'cta-fills-v1'
const ANIMAL_KEY = 'cta-animal-v1'
const COLOR_KEY = 'cta-color-v1'

export function loadFills() {
  try {
    const raw = localStorage.getItem(FILLS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveFills(fills) {
  try { localStorage.setItem(FILLS_KEY, JSON.stringify(fills)) } catch { /* ignore */ }
}

export function loadAnimalId(fallback) {
  try { return localStorage.getItem(ANIMAL_KEY) || fallback } catch { return fallback }
}

export function saveAnimalId(id) {
  try { localStorage.setItem(ANIMAL_KEY, id) } catch { /* ignore */ }
}

export function loadColor(fallback) {
  try { return localStorage.getItem(COLOR_KEY) || fallback } catch { return fallback }
}

export function saveColor(hex) {
  try { localStorage.setItem(COLOR_KEY, hex) } catch { /* ignore */ }
}
