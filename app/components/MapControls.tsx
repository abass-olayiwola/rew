// components/MapControls.tsx
'use client'

import { useMap } from 'react-leaflet'
import { ZoomIn, ZoomOut, Navigation } from 'lucide-react'

export default function MapControls() {
  const map = useMap()

  return (
    <div className="absolute right-4 top-4 z-[1000] flex flex-col space-y-2">
      <button
        onClick={() => map.zoomIn()}
        className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition"
        aria-label="Zoom in"
      >
        <ZoomIn className="h-5 w-5" />
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition"
        aria-label="Zoom out"
      >
        <ZoomOut className="h-5 w-5" />
      </button>
      <button
        onClick={() => map.locate()}
        className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition"
        aria-label="Locate me"
      >
        <Navigation className="h-5 w-5" />
      </button>
    </div>
  )
}