// components/MapView.tsx
'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'
import { ZoomIn, ZoomOut, Layers, Navigation, Printer, Home } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'





const VANCOUVER_COORDS = [49.2827, -123.1207] as [number, number]

function MapControls() {
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

interface MapViewProps {
  onPropertyClick?: (property: any) => void
}

export default function MapView({ onPropertyClick }: MapViewProps) {
  const [properties, setProperties] = useState<any[]>([])
  const [mapStyle, setMapStyle] = useState<'street' | 'satellite' | 'light'>('street')

    

  const getTileLayer = () => {
    switch (mapStyle) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      case 'light':
        return 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  }

  

  return (
    <>
      <MapContainer
        center={VANCOUVER_COORDS}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={true}
        style={{ height: '100%', width: '50%' }}
      >
        <TileLayer
          url={getTileLayer()}
          
        />
        
        

        <MapControls />
      </MapContainer>

     

      

    </>
  )
}