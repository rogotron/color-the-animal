// Each animal is defined as: { id, name, viewBox, regions, render }
// - regions: array of region ids (used for completion detection + persistence)
// - render({ fills, onRegionClick, interactive }): returns SVG <g> contents.
//   Region shapes use id={regionId}, fill from fills, and click handler.
//   Decorative details (eyes, nose, mouth) are non-interactive overlays.

import React from 'react'

const STROKE = '#1a1a1a'
const SW = 3

function regionProps(id, fills, onRegionClick, interactive, extra = {}) {
  return {
    id,
    fill: fills[id] || '#ffffff',
    stroke: STROKE,
    strokeWidth: SW,
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    onClick: interactive ? (e) => { e.stopPropagation(); onRegionClick(id) } : undefined,
    style: {
      cursor: interactive ? 'pointer' : 'default',
      transition: 'fill 250ms ease',
    },
    ...extra,
  }
}

// ===================== LION =====================
const Lion = {
  id: 'lion',
  name: 'Lion',
  viewBox: '0 0 500 400',
  regions: ['tail', 'body', 'legs', 'mane', 'head', 'snout', 'ear-left', 'ear-right'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 380 245 C 450 215 475 250 460 300 C 450 320 425 318 432 295 C 422 308 405 300 395 282" />
        <ellipse {...r('body')} cx="275" cy="265" rx="125" ry="60" />
        <path {...r('legs')} d="M 180 315 L 185 370 L 215 370 L 215 310 Z M 245 315 L 250 370 L 275 370 L 275 312 Z M 310 312 L 310 370 L 335 370 L 335 312 Z M 360 310 L 360 370 L 385 370 L 385 312 Z" />
        <circle {...r('mane')} cx="145" cy="220" r="98" />
        <path {...r('ear-left')} d="M 88 142 Q 78 108 118 130 Q 110 148 102 158 Z" />
        <path {...r('ear-right')} d="M 200 142 Q 210 108 170 130 Q 178 148 186 158 Z" />
        <circle {...r('head')} cx="145" cy="225" r="68" />
        <ellipse {...r('snout')} cx="108" cy="248" rx="32" ry="24" />
        {/* details */}
        <circle cx="120" cy="218" r="5" fill={STROKE} />
        <circle cx="168" cy="218" r="5" fill={STROKE} />
        <ellipse cx="140" cy="240" rx="7" ry="5" fill={STROKE} />
        <path d="M 140 245 L 140 252 M 140 252 Q 132 258 126 254 M 140 252 Q 148 258 154 254" stroke={STROKE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    )
  },
}

// ===================== ELEPHANT =====================
const Elephant = {
  id: 'elephant',
  name: 'Elephant',
  viewBox: '0 0 500 400',
  regions: ['tail', 'body', 'legs', 'head', 'ear', 'trunk', 'tusk'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 410 240 C 460 240 470 270 458 295 C 452 310 445 308 446 296 C 442 305 432 302 432 290" />
        <ellipse {...r('body')} cx="280" cy="240" rx="140" ry="80" />
        <path {...r('legs')} d="M 165 295 L 165 370 L 215 370 L 215 295 Z M 250 295 L 250 370 L 295 370 L 295 295 Z M 320 295 L 320 370 L 365 370 L 365 295 Z M 380 295 L 380 370 L 415 370 L 415 295 Z" />
        <ellipse {...r('head')} cx="130" cy="200" rx="80" ry="78" />
        <path {...r('ear')} d="M 175 145 Q 230 130 235 215 Q 230 250 195 250 Q 175 245 170 220 Z" />
        <path {...r('trunk')} d="M 70 220 C 30 240 25 305 60 320 C 90 330 110 305 95 290 C 85 285 80 295 88 305 C 78 312 65 305 70 290 C 75 270 95 260 105 270" />
        <path {...r('tusk')} d="M 95 252 Q 78 282 70 290 Q 80 285 92 275 Q 100 268 105 258 Z" />
        {/* details */}
        <circle cx="115" cy="190" r="5" fill={STROKE} />
        <circle cx="105" cy="200" r="2" fill="#fff" />
        {/* toenails */}
        <path d="M 175 365 L 175 358 M 188 365 L 188 358 M 201 365 L 201 358" stroke={STROKE} strokeWidth="2" fill="none" />
        <path d="M 260 365 L 260 358 M 273 365 L 273 358 M 286 365 L 286 358" stroke={STROKE} strokeWidth="2" fill="none" />
        <path d="M 330 365 L 330 358 M 343 365 L 343 358 M 356 365 L 356 358" stroke={STROKE} strokeWidth="2" fill="none" />
        <path d="M 388 365 L 388 358 M 398 365 L 398 358 M 408 365 L 408 358" stroke={STROKE} strokeWidth="2" fill="none" />
      </g>
    )
  },
}

// ===================== GIRAFFE =====================
const Giraffe = {
  id: 'giraffe',
  name: 'Giraffe',
  viewBox: '0 0 500 400',
  regions: ['tail', 'body', 'legs', 'neck', 'head', 'horns', 'ear', 'spots'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 320 240 C 350 250 360 290 350 320 C 345 332 340 332 342 320 C 335 330 327 322 332 312" />
        <ellipse {...r('body')} cx="245" cy="260" rx="95" ry="50" />
        <path {...r('legs')} d="M 165 295 L 165 380 L 195 380 L 195 295 Z M 215 295 L 215 380 L 240 380 L 240 295 Z M 270 295 L 270 380 L 295 380 L 295 295 Z M 305 295 L 305 380 L 330 380 L 330 295 Z" />
        <path {...r('neck')} d="M 305 235 Q 290 130 365 70 Q 380 60 395 80 Q 330 130 345 235 Z" />
        <ellipse {...r('head')} cx="385" cy="68" rx="48" ry="30" transform="rotate(-15 385 68)" />
        <path {...r('horns')} d="M 360 40 L 355 18 Q 355 12 362 14 L 368 35 Z M 388 30 L 384 8 Q 384 2 391 4 L 396 26 Z" />
        <path {...r('ear')} d="M 412 50 Q 438 38 432 62 Q 425 70 415 65 Z" />
        {/* Spots - all as a single layer overlay path */}
        <g {...r('spots')} fill={fills['spots'] || '#ffffff'}>
          <circle cx="210" cy="240" r="11" />
          <circle cx="240" cy="258" r="9" />
          <circle cx="275" cy="245" r="11" />
          <circle cx="300" cy="270" r="9" />
          <circle cx="195" cy="275" r="10" />
          <circle cx="255" cy="285" r="8" />
          <circle cx="320" cy="220" r="7" />
          <circle cx="335" cy="170" r="8" />
          <circle cx="318" cy="135" r="7" />
          <circle cx="345" cy="105" r="7" />
        </g>
        {/* details */}
        <circle cx="395" cy="60" r="3.5" fill={STROKE} />
        <ellipse cx="362" cy="78" rx="3" ry="2" fill={STROKE} />
        <path d="M 358 86 Q 365 90 372 85" stroke={STROKE} strokeWidth="2" fill="none" />
        {/* horn tufts */}
        <circle cx="361" cy="14" r="4" fill={STROKE} />
        <circle cx="391" cy="4" r="4" fill={STROKE} />
      </g>
    )
  },
}

// ===================== DOG =====================
const Dog = {
  id: 'dog',
  name: 'Dog',
  viewBox: '0 0 500 400',
  regions: ['tail', 'body', 'legs', 'head', 'ear', 'snout', 'collar'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 385 235 C 440 200 455 240 445 285 C 438 300 430 297 432 285" />
        <ellipse {...r('body')} cx="275" cy="265" rx="120" ry="60" />
        <path {...r('legs')} d="M 180 310 L 180 370 L 210 370 L 210 310 Z M 240 310 L 240 370 L 270 370 L 270 310 Z M 305 310 L 305 370 L 335 370 L 335 310 Z M 360 310 L 360 370 L 390 370 L 390 310 Z" />
        <ellipse {...r('head')} cx="145" cy="220" rx="70" ry="60" />
        <path {...r('ear')} d="M 85 170 Q 65 130 105 145 Q 115 170 108 195 Q 95 200 85 170 Z M 185 195 Q 200 165 210 145 Q 230 175 205 200 Z" />
        <ellipse {...r('snout')} cx="92" cy="250" rx="32" ry="22" />
        <path {...r('collar')} d="M 195 280 Q 215 290 215 305 L 195 305 Q 180 295 195 280 Z" />
        {/* details */}
        <ellipse cx="92" cy="240" rx="7" ry="5" fill={STROKE} />
        <circle cx="120" cy="210" r="5" fill={STROKE} />
        <circle cx="160" cy="208" r="5" fill={STROKE} />
        <path d="M 92 250 L 92 260 Q 85 268 80 264 M 92 260 Q 100 268 105 264" stroke={STROKE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="206" cy="295" r="4" fill={STROKE} />
      </g>
    )
  },
}

// ===================== SHARK =====================
const Shark = {
  id: 'shark',
  name: 'Shark',
  viewBox: '0 0 500 400',
  regions: ['body', 'belly', 'fin-top', 'fin-side', 'tail', 'teeth', 'gills'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 410 200 L 480 130 L 470 210 L 480 280 L 410 230 Z" />
        <path {...r('body')} d="M 70 200 C 100 130 250 110 410 200 C 250 290 100 270 70 200 Z" />
        <path {...r('belly')} d="M 110 215 C 200 280 320 280 395 220 C 320 270 200 270 110 215 Z" />
        <path {...r('fin-top')} d="M 220 130 L 250 60 L 290 130 Z" />
        <path {...r('fin-side')} d="M 200 235 L 240 295 L 260 240 Z" />
        <path {...r('teeth')} d="M 75 200 L 88 215 L 95 200 L 105 215 L 115 200 L 125 215 L 135 200 L 80 205 Z" fill="#fff" />
        <path {...r('gills')} d="M 165 175 Q 168 195 165 215 M 180 172 Q 183 195 180 218 M 195 175 Q 198 195 195 215" stroke={STROKE} strokeWidth="3" fill="none" />
        {/* details - eye */}
        <circle cx="135" cy="175" r="8" fill="#fff" stroke={STROKE} strokeWidth="2" />
        <circle cx="137" cy="175" r="4" fill={STROKE} />
      </g>
    )
  },
}

// ===================== T-REX =====================
const TRex = {
  id: 'trex',
  name: 'T-Rex',
  viewBox: '0 0 500 400',
  regions: ['tail', 'body', 'leg', 'foot', 'arm', 'head', 'jaw', 'teeth'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 280 245 C 380 220 460 260 475 320 C 470 340 450 340 445 322 C 440 332 425 330 425 318 C 415 305 380 290 350 285 C 320 280 295 270 280 260 Z" />
        <path {...r('body')} d="M 145 240 C 135 160 230 130 270 200 C 290 235 290 280 270 295 C 240 310 180 305 150 280 Z" />
        <path {...r('leg')} d="M 195 290 L 175 360 L 215 365 L 230 290 Z" />
        <path {...r('foot')} d="M 165 360 L 155 380 L 235 380 L 220 360 Z" />
        <path {...r('arm')} d="M 175 215 L 155 245 L 142 240 L 148 250 L 138 248 L 152 258 Z" />
        <path {...r('head')} d="M 120 175 C 60 170 35 130 75 110 C 100 100 145 110 165 130 C 175 145 170 165 155 175 Z" />
        <path {...r('jaw')} d="M 75 165 C 50 175 50 200 100 200 L 160 185 C 150 195 110 195 95 185 Z" />
        <g {...r('teeth')} fill={fills['teeth'] || '#ffffff'}>
          <path d="M 80 165 L 85 178 L 90 165 Z" />
          <path d="M 100 165 L 105 178 L 110 165 Z" />
          <path d="M 120 165 L 125 178 L 130 165 Z" />
          <path d="M 80 185 L 85 175 L 90 185 Z" />
          <path d="M 100 185 L 105 175 L 110 185 Z" />
          <path d="M 120 185 L 125 175 L 130 185 Z" />
        </g>
        {/* details */}
        <circle cx="100" cy="135" r="5" fill={STROKE} />
        <circle cx="102" cy="135" r="2" fill="#fff" />
      </g>
    )
  },
}

// ===================== OCTOPUS =====================
const Octopus = {
  id: 'octopus',
  name: 'Octopus',
  viewBox: '0 0 500 400',
  regions: ['head', 'tentacle-1', 'tentacle-2', 'tentacle-3', 'tentacle-4', 'tentacle-5', 'tentacle-6'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        {/* tentacles drawn behind head */}
        <path {...r('tentacle-1')} d="M 130 200 C 70 230 50 290 80 340 C 95 360 115 350 105 330 C 100 320 110 310 120 320 C 100 280 110 240 140 220 Z" />
        <path {...r('tentacle-2')} d="M 170 230 C 130 280 130 340 160 370 C 175 380 195 370 180 355 C 175 345 188 340 195 350 C 175 310 180 280 200 250 Z" />
        <path {...r('tentacle-3')} d="M 220 240 C 210 300 215 360 235 380 C 250 388 265 378 255 365 C 250 358 263 350 270 360 C 245 320 250 280 255 250 Z" />
        <path {...r('tentacle-4')} d="M 280 240 C 290 300 285 360 305 380 C 320 388 335 378 325 365 C 320 358 333 350 340 360 C 315 320 320 280 305 250 Z" />
        <path {...r('tentacle-5')} d="M 330 230 C 370 280 370 340 340 370 C 325 380 305 370 320 355 C 325 345 312 340 305 350 C 325 310 320 280 300 250 Z" />
        <path {...r('tentacle-6')} d="M 370 200 C 430 230 450 290 420 340 C 405 360 385 350 395 330 C 400 320 390 310 380 320 C 400 280 390 240 360 220 Z" />
        <path {...r('head')} d="M 130 160 C 130 80 370 80 370 160 C 370 220 320 250 250 250 C 180 250 130 220 130 160 Z" />
        {/* details */}
        <circle cx="210" cy="160" r="14" fill="#fff" stroke={STROKE} strokeWidth="2.5" />
        <circle cx="290" cy="160" r="14" fill="#fff" stroke={STROKE} strokeWidth="2.5" />
        <circle cx="212" cy="162" r="6" fill={STROKE} />
        <circle cx="292" cy="162" r="6" fill={STROKE} />
        <path d="M 230 195 Q 250 210 270 195" stroke={STROKE} strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* suckers - small dots */}
        <circle cx="105" cy="280" r="4" fill={STROKE} opacity="0.4" />
        <circle cx="115" cy="320" r="4" fill={STROKE} opacity="0.4" />
        <circle cx="170" cy="320" r="4" fill={STROKE} opacity="0.4" />
        <circle cx="175" cy="355" r="4" fill={STROKE} opacity="0.4" />
        <circle cx="235" cy="335" r="4" fill={STROKE} opacity="0.4" />
        <circle cx="245" cy="365" r="4" fill={STROKE} opacity="0.4" />
        <circle cx="310" cy="335" r="4" fill={STROKE} opacity="0.4" />
        <circle cx="320" cy="365" r="4" fill={STROKE} opacity="0.4" />
        <circle cx="335" cy="355" r="4" fill={STROKE} opacity="0.4" />
        <circle cx="380" cy="320" r="4" fill={STROKE} opacity="0.4" />
        <circle cx="395" cy="280" r="4" fill={STROKE} opacity="0.4" />
      </g>
    )
  },
}

// ===================== DRAGON =====================
const Dragon = {
  id: 'dragon',
  name: 'Dragon',
  viewBox: '0 0 500 400',
  regions: ['tail', 'body', 'legs', 'wing', 'head', 'horn', 'belly', 'fire'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 380 270 C 460 260 480 320 450 360 C 440 370 430 365 432 355 C 428 365 415 360 418 350 C 410 345 395 335 380 320 Z" />
        <path {...r('body')} d="M 150 250 C 150 180 240 170 290 200 C 350 220 390 250 380 290 C 360 320 250 320 180 305 C 150 295 145 275 150 250 Z" />
        <path {...r('belly')} d="M 175 295 C 240 320 330 318 365 295 C 330 312 240 312 175 295 Z" />
        <path {...r('legs')} d="M 200 300 L 195 360 L 230 360 L 235 300 Z M 320 300 L 325 360 L 360 360 L 355 300 Z" />
        <path {...r('wing')} d="M 230 195 L 200 90 L 260 145 L 295 80 L 305 150 L 350 100 L 340 175 Z" />
        <path {...r('head')} d="M 95 215 C 60 215 50 175 80 165 C 100 155 140 160 165 185 C 175 200 168 220 150 225 C 130 230 110 222 95 215 Z" />
        <path {...r('horn')} d="M 105 162 L 95 130 L 115 158 Z M 130 158 L 130 122 L 145 158 Z" />
        <g {...r('fire')} fill={fills['fire'] || '#ffffff'}>
          <path d="M 50 200 Q 20 195 30 215 Q 10 210 22 230 Q 5 235 25 245 Q 35 235 50 240 Q 35 220 50 220 Q 35 205 50 200 Z" />
        </g>
        {/* details */}
        <circle cx="125" cy="190" r="5" fill={STROKE} />
        <circle cx="127" cy="190" r="2" fill="#fff" />
        <path d="M 80 210 Q 75 215 80 220" stroke={STROKE} strokeWidth="2" fill="none" />
        {/* nostril */}
        <circle cx="65" cy="195" r="2.5" fill={STROKE} />
        {/* wing details */}
        <path d="M 230 195 L 235 150 M 250 175 L 260 145 M 280 180 L 295 130 M 310 175 L 320 130 M 335 180 L 340 130" stroke={STROKE} strokeWidth="2" fill="none" />
      </g>
    )
  },
}

// ===================== KANGAROO =====================
const Kangaroo = {
  id: 'kangaroo',
  name: 'Kangaroo',
  viewBox: '0 0 500 400',
  regions: ['tail', 'legLeft', 'legRight', 'body', 'belly', 'arm', 'head', 'earLeft', 'earRight'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 230 300 C 305 342 385 360 452 350 C 463 348 463 333 450 330 C 392 328 322 310 268 280 Z" />
        <path {...r('legLeft')} d="M 175 300 C 165 332 148 352 116 360 L 180 374 C 212 360 216 330 210 304 Z" />
        <path {...r('legRight')} d="M 214 304 C 209 336 198 354 172 364 L 236 376 C 262 360 260 330 250 306 Z" />
        <ellipse {...r('body')} cx="210" cy="215" rx="78" ry="96" />
        <path {...r('belly')} d="M 160 175 C 138 220 148 280 184 306 C 200 290 206 250 200 198 C 198 178 180 168 160 175 Z" />
        <path {...r('arm')} d="M 168 196 C 146 206 138 236 151 256 C 159 259 167 250 161 240 C 154 224 166 210 180 206 Z" />
        <ellipse {...r('head')} cx="158" cy="112" rx="44" ry="40" />
        <path {...r('earLeft')} d="M 134 80 C 124 40 138 34 151 72 C 153 82 148 88 140 86 Z" />
        <path {...r('earRight')} d="M 172 74 C 180 34 194 40 186 80 C 183 88 176 86 173 78 Z" />
        {/* details */}
        <circle cx="140" cy="106" r="4.5" fill={STROKE} />
        <circle cx="142" cy="105" r="1.6" fill="#fff" />
        <ellipse cx="118" cy="120" rx="6" ry="4" fill={STROKE} />
        <path d="M 118 124 Q 126 130 134 125" stroke={STROKE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    )
  },
}

// ===================== FALCON =====================
const Falcon = {
  id: 'falcon',
  name: 'Falcon',
  viewBox: '0 0 500 400',
  regions: ['tail', 'wingLeft', 'wingRight', 'body', 'head', 'beak', 'footLeft', 'footRight'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 238 345 L 232 398 L 268 398 L 262 345 Z" />
        <path {...r('wingLeft')} d="M 182 160 C 122 182 106 262 122 306 C 137 311 167 300 196 270 C 186 220 186 184 196 164 Z" />
        <path {...r('wingRight')} d="M 318 160 C 378 182 394 262 378 306 C 363 311 333 300 304 270 C 314 220 314 184 304 164 Z" />
        <ellipse {...r('body')} cx="250" cy="245" rx="80" ry="115" />
        <circle {...r('head')} cx="250" cy="104" r="50" />
        <path {...r('beak')} d="M 236 132 L 264 132 L 254 156 C 252 163 246 161 248 154 L 244 154 Z" />
        <path {...r('footLeft')} d="M 212 352 C 205 366 205 384 213 386 C 217 384 219 373 221 365 C 225 373 229 381 233 381 C 237 377 232 360 226 352 Z" />
        <path {...r('footRight')} d="M 288 352 C 295 366 295 384 287 386 C 283 384 281 373 279 365 C 275 373 271 381 267 381 C 263 377 268 360 274 352 Z" />
        {/* details */}
        <circle cx="232" cy="98" r="6" fill={STROKE} />
        <circle cx="268" cy="98" r="6" fill={STROKE} />
        <circle cx="234" cy="96" r="2" fill="#fff" />
        <circle cx="270" cy="96" r="2" fill="#fff" />
      </g>
    )
  },
}

// ===================== BALD EAGLE =====================
const Eagle = {
  id: 'eagle',
  name: 'Bald Eagle',
  viewBox: '0 0 500 400',
  regions: ['tail', 'wingLeft', 'wingRight', 'body', 'head', 'beak', 'footLeft', 'footRight'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 238 318 L 232 388 L 268 388 L 262 318 Z" />
        <path {...r('wingLeft')} d="M 206 172 C 142 150 70 150 44 176 C 60 187 110 196 150 200 C 110 211 70 226 60 246 C 100 251 172 240 212 235 Z" />
        <path {...r('wingRight')} d="M 294 172 C 358 150 430 150 456 176 C 440 187 390 196 350 200 C 390 211 430 226 440 246 C 400 251 328 240 288 235 Z" />
        <ellipse {...r('body')} cx="250" cy="232" rx="56" ry="96" />
        <circle {...r('head')} cx="250" cy="108" r="48" />
        <path {...r('beak')} d="M 234 128 L 266 128 L 258 158 C 256 167 249 165 251 156 L 244 156 Z" />
        <path {...r('footLeft')} d="M 225 322 C 218 337 218 354 226 356 C 230 354 232 344 234 336 C 238 344 242 352 246 352 C 249 348 244 328 238 322 Z" />
        <path {...r('footRight')} d="M 275 322 C 282 337 282 354 274 356 C 270 354 268 344 266 336 C 262 344 258 352 254 352 C 251 348 256 328 262 322 Z" />
        {/* details */}
        <circle cx="232" cy="102" r="6" fill={STROKE} />
        <circle cx="268" cy="102" r="6" fill={STROKE} />
        <circle cx="234" cy="100" r="2" fill="#fff" />
        <circle cx="270" cy="100" r="2" fill="#fff" />
      </g>
    )
  },
}

// ===================== PEACOCK =====================
const Peacock = {
  id: 'peacock',
  name: 'Peacock',
  viewBox: '0 0 500 400',
  regions: ['tailFan', 'tailSpotLeft', 'tailSpotCenter', 'tailSpotRight', 'legs', 'body', 'wing', 'head', 'crest', 'beak'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tailFan')} d="M 195 285 C 120 285 70 210 90 140 C 115 60 230 35 320 60 C 415 88 450 190 405 265 C 365 320 270 300 195 285 Z" />
        <circle {...r('tailSpotLeft')} cx="205" cy="135" r="22" />
        <circle {...r('tailSpotCenter')} cx="298" cy="112" r="22" />
        <circle {...r('tailSpotRight')} cx="382" cy="165" r="22" />
        <path {...r('legs')} d="M 162 316 L 156 372 L 170 372 L 174 318 Z M 186 318 L 192 372 L 206 372 L 196 316 Z" />
        <path {...r('body')} d="M 175 322 C 120 320 118 250 145 218 C 132 188 135 158 152 148 C 160 143 170 147 169 158 C 162 182 168 208 195 232 C 222 262 225 322 175 322 Z" />
        <path {...r('wing')} d="M 150 240 C 130 256 128 292 151 306 C 171 301 179 270 173 248 C 166 240 156 238 150 240 Z" />
        <circle {...r('head')} cx="153" cy="132" r="24" />
        <g {...r('crest')} fill={fills['crest'] || '#ffffff'}>
          <ellipse cx="142" cy="100" rx="4" ry="11" transform="rotate(-18 142 100)" />
          <ellipse cx="153" cy="96" rx="4" ry="12" />
          <ellipse cx="164" cy="100" rx="4" ry="11" transform="rotate(18 164 100)" />
        </g>
        <path {...r('beak')} d="M 132 130 L 110 137 L 132 145 Z" />
        {/* details */}
        <circle cx="148" cy="128" r="4" fill={STROKE} />
        <circle cx="149" cy="127" r="1.5" fill="#fff" />
        <circle cx="205" cy="135" r="9" fill={STROKE} opacity="0.35" />
        <circle cx="298" cy="112" r="9" fill={STROKE} opacity="0.35" />
        <circle cx="382" cy="165" r="9" fill={STROKE} opacity="0.35" />
      </g>
    )
  },
}

// ===================== FLAMINGO =====================
const Flamingo = {
  id: 'flamingo',
  name: 'Flamingo',
  viewBox: '0 0 500 400',
  regions: ['legLeft', 'legRight', 'body', 'wing', 'neck', 'head', 'beak'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('legLeft')} d="M 248 246 L 236 320 L 224 374 L 234 376 L 246 322 L 257 248 Z" />
        <path {...r('legRight')} d="M 282 248 L 290 320 L 300 374 L 310 372 L 300 320 L 291 248 Z" />
        <ellipse {...r('body')} cx="266" cy="206" rx="84" ry="54" />
        <path {...r('wing')} d="M 228 176 C 280 165 332 176 348 202 C 322 218 270 218 234 202 C 226 192 224 182 228 176 Z" />
        <path {...r('neck')} d="M 206 188 C 174 152 184 96 216 80 C 232 72 242 80 233 92 C 210 100 206 146 224 178 Z" />
        <circle {...r('head')} cx="224" cy="70" r="18" />
        <path {...r('beak')} d="M 210 70 C 194 70 180 82 178 98 C 183 100 192 93 200 89 C 209 85 215 80 215 73 Z" />
        {/* details */}
        <circle cx="228" cy="66" r="3.5" fill={STROKE} />
        <circle cx="229" cy="65" r="1.3" fill="#fff" />
        <path d="M 184 96 C 188 102 196 102 200 98" stroke={STROKE} strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    )
  },
}

// ===================== CHIMPANZEE =====================
const Chimpanzee = {
  id: 'chimp',
  name: 'Chimpanzee',
  viewBox: '0 0 500 400',
  regions: ['body', 'legLeft', 'legRight', 'armLeft', 'armRight', 'handLeft', 'handRight', 'earLeft', 'earRight', 'face'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <ellipse {...r('body')} cx="250" cy="258" rx="84" ry="96" />
        <path {...r('legLeft')} d="M 216 322 C 200 346 190 366 201 379 L 242 379 C 247 360 247 340 240 326 Z" />
        <path {...r('legRight')} d="M 284 322 C 300 346 310 366 299 379 L 258 379 C 253 360 253 340 260 326 Z" />
        <path {...r('armLeft')} d="M 186 198 C 150 214 130 272 142 322 C 154 332 169 323 170 306 C 162 272 176 232 202 217 Z" />
        <path {...r('armRight')} d="M 314 198 C 350 214 370 272 358 322 C 346 332 331 323 330 306 C 338 272 324 232 298 217 Z" />
        <ellipse {...r('handLeft')} cx="150" cy="330" rx="22" ry="24" />
        <ellipse {...r('handRight')} cx="350" cy="330" rx="22" ry="24" />
        <circle {...r('earLeft')} cx="189" cy="116" r="26" />
        <circle {...r('earRight')} cx="311" cy="116" r="26" />
        <circle {...r('face')} cx="250" cy="120" r="60" />
        {/* details */}
        <ellipse cx="250" cy="148" rx="40" ry="34" fill="none" stroke={STROKE} strokeWidth="2" />
        <circle cx="232" cy="108" r="5" fill={STROKE} />
        <circle cx="268" cy="108" r="5" fill={STROKE} />
        <circle cx="240" cy="148" r="2.5" fill={STROKE} />
        <circle cx="260" cy="148" r="2.5" fill={STROKE} />
        <path d="M 232 166 Q 250 178 268 166" stroke={STROKE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    )
  },
}

// ===================== RHINOCEROS =====================
const Rhinoceros = {
  id: 'rhino',
  name: 'Rhinoceros',
  viewBox: '0 0 500 400',
  regions: ['tail', 'legBack', 'body', 'head', 'legFront', 'hornSmall', 'hornLarge', 'earLeft', 'earRight'],
  render({ fills, onRegionClick, interactive }) {
    const r = (id, extra) => regionProps(id, fills, onRegionClick, interactive, extra)
    return (
      <g>
        <path {...r('tail')} d="M 390 222 C 414 232 420 280 408 312 C 404 320 397 318 400 307 C 396 315 388 311 392 301 C 400 281 398 250 382 234 Z" />
        <path {...r('legBack')} d="M 300 288 L 297 366 L 327 366 L 329 288 Z M 344 286 L 344 366 L 373 366 L 373 286 Z" />
        <ellipse {...r('body')} cx="272" cy="216" rx="126" ry="78" />
        <ellipse {...r('head')} cx="126" cy="240" rx="72" ry="54" />
        <path {...r('legFront')} d="M 158 286 L 156 366 L 186 366 L 187 286 Z M 200 288 L 200 366 L 229 366 L 229 288 Z" />
        <path {...r('hornSmall')} d="M 94 206 C 91 180 105 178 109 200 C 111 209 104 213 99 211 Z" />
        <path {...r('hornLarge')} d="M 62 216 C 54 174 71 164 79 202 C 81 212 75 220 67 219 Z" />
        <path {...r('earLeft')} d="M 148 190 C 143 166 161 166 164 187 C 165 197 157 200 151 196 Z" />
        <path {...r('earRight')} d="M 172 187 C 168 163 186 164 188 184 C 189 195 181 198 175 194 Z" />
        {/* details */}
        <circle cx="112" cy="222" r="5" fill={STROKE} />
        <circle cx="114" cy="221" r="1.8" fill="#fff" />
        <circle cx="62" cy="252" r="3.5" fill={STROKE} />
        <path d="M 58 268 Q 80 278 104 270" stroke={STROKE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 165 366 L 165 358 M 178 366 L 178 358 M 211 366 L 211 358 M 308 366 L 308 358 M 355 366 L 355 358" stroke={STROKE} strokeWidth="2" fill="none" />
      </g>
    )
  },
}

export const ANIMALS = [Lion, Elephant, Giraffe, Dog, Shark, TRex, Octopus, Dragon, Kangaroo, Falcon, Eagle, Peacock, Flamingo, Chimpanzee, Rhinoceros]

export const ANIMALS_BY_ID = Object.fromEntries(ANIMALS.map(a => [a.id, a]))
