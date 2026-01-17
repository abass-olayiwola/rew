// components/MapView.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet'
import { ZoomIn, ZoomOut, Navigation, Home } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Dropdown_onMap from './Dropdown_onMap'

// Remove marker icon configuration since we're using circles
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
})

// Static data 
const mockProperties = [
  {
    _id: '1',
    title: 'Modern Downtown Condo',
    price: 895000,
    address: '1234 Main St, Vancouver',
    city: 'Vancouver',
    province: 'BC',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 850,
    lotSize: 2500,
    propertyType: 'condo',
    listingType: 'forSale',
    description: 'Beautiful modern condo in downtown Vancouver',
    location: { lat: 49.2827, lng: -123.1207 },
    
  },
  {
    _id: '2',
    title: 'Luxury House',
    price: 2150000,
    address: '567 Oak Ave, Burnaby',
    city: 'Burnaby',
    province: 'BC',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2100,
    propertyType: 'house',
    listingType: 'forSale',
    description: 'Luxury house with amazing views',
    location: { lat: 49.2488, lng: -123.1085 },
    
  },
  {
    _id: 3,
    price: 2150000,
    address: "789 Marine Dr, North Vancouver",
    city: 'Burnaby',
    province: 'BC',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2100,
    propertyType: 'house',
    listingType: 'forRent',
    description: 'Luxury house with amazing views',
    location: { lat: 49.2288, lng: -123.1035 },
  }
]

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

// Custom Circle Marker with ID
interface CustomCircleMarkerProps {
  property: any;
  onPropertyClick: (property: any) => void;
}

function CustomCircleMarker({ property, onPropertyClick }: CustomCircleMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const circleRef = useRef<L.CircleMarker>(null);
  
  // Calculate circle radius based on price (or any other logic)
  const getRadius = () => {
    return 20; // Fixed radius for all circles
  };

  const circleStyle = {
    fillColor: isHovered ? '#1d4ed8' : '#3b82f6', // Darker blue on hover
    color: '#1e40af', // Border color
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
    className: 'property-circle-marker' // Add class for custom styling
  };

  // Create a custom div icon for the marker to display the ID
  const circleIcon = L.divIcon({
    html: `
      <div class="property-circle-container">
        <div class="property-circle" data-property-id="${property._id}">
          <span class="property-id">${property._id}</span>
        </div>
      </div>
    `,
    className: 'custom-circle-marker',
    iconSize: [40, 40], // Match the circle diameter
    iconAnchor: [20, 20], // Center the icon
  });

  return (
    <>
      {/* Marker with custom div icon that looks like a circle */}
      <Marker
        position={[property.location.lat, property.location.lng]}
        icon={circleIcon}
        eventHandlers={{
          
          mouseover: () => {
            setIsHovered(true);
            const marker = circleRef.current;
            if (marker) {
              marker.setStyle({
                ...circleStyle,
                fillColor: '#1d4ed8',
                fillOpacity: 0.9
              });
            }
          },
          mouseout: () => {
            setIsHovered(false);
            const marker = circleRef.current;
            if (marker) {
              marker.setStyle({
                ...circleStyle,
                fillColor: '#3b82f6',
                fillOpacity: 0.8
              });
            }
          },
        }}
      >
        <Popup>
          <div className="p-2 max-w-xs">
            <div className="font-bold text-lg mb-1">
              ${property.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {property.address}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                {property.bedrooms} bed
              </div>
              <div className="flex items-center">
                {property.bathrooms} bath
              </div>
              <div className="flex items-center">
                {property.squareFeet.toLocaleString()} sqft
              </div>
              <div className="flex items-center">
                {property.propertyType}
              </div>
            </div>
            <button className="w-full mt-2 bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700">
              View Details
            </button>
          </div>
        </Popup>
      </Marker>
      
      {/* Actual circle marker for hover/click effects - hidden but interactive */}
      <CircleMarker
        ref={circleRef}
        center={[property.location.lat, property.location.lng]}
        radius={getRadius()}
        pathOptions={{
          ...circleStyle,
          fillOpacity: 0 // Make it transparent since we're using the div icon for visuals
        }}
        eventHandlers={{
          
          mouseover: () => setIsHovered(true),
          mouseout: () => setIsHovered(false),
        }}
      />
    </>
  );
}

interface MapViewProps {
  onPropertyClick?: (property: any) => void
}

export default function MapView({ onPropertyClick }: MapViewProps) {
  const [isClient, setIsClient] = useState(false)
  const [properties, setProperties] = useState<any[]>([])
  const [mapStyle, setMapStyle] = useState<'street' | 'satellite' | 'light'>('street')
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null)

  useEffect(() => {
    setIsClient(true)
    // For now, use mock data
    setProperties(mockProperties)
  }, [])

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property)
    
  }

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

  if (!isClient) {
    return <div className="h-full bg-gray-200 animate-pulse" />
  }

  return (
    <>
      <style jsx global>{`
        .property-circle-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
        }
        
        .property-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #3b82f6;
          border: 2px solid #1e40af;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .property-circle:hover {
          background-color: #1d4ed8;
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .property-id {
          color: white;
          font-weight: bold;
          font-size: 14px;
          text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
          user-select: none;
        }
        
        .custom-circle-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
        
        /* Hide the actual circle marker since we're using div icon for visuals */
        .property-circle-marker {
          fill-opacity: 0 !important;
          stroke-opacity: 0 !important;
          pointer-events: all !important;
        }
      `}</style>

      <MapContainer
        center={VANCOUVER_COORDS}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={getTileLayer()}
          attribution={
            mapStyle === 'street' 
              ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              : mapStyle === 'satellite'
              ? 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              : '&copy; <a href="https://carto.com/">CARTO</a>'
          }
        />
        
        {properties.map((property) => {
          if (!property.location?.lat || !property.location?.lng) return null
          
          return (
            <CustomCircleMarker
              key={property._id}
              property={property}
              onPropertyClick={handlePropertyClick}
            />
          )
        })}

    <div className="absolute left-20 top-4 z-[1000] flex flex-col space-y-2">
      <Dropdown_onMap/>
    </div>
        <MapControls />
      </MapContainer>

     

      {/* Map Style Selector */}
      <div className="absolute left-4 bottom-4 flex bg-white rounded-lg shadow-lg overflow-hidden">
        {(['street', 'satellite', 'light'] as const).map((style) => (
          <button
            key={style}
            onClick={() => setMapStyle(style)}
            className={`px-3 py-2 text-sm capitalize hover:bg-gray-50 transition ${
              mapStyle === style ? 'bg-blue-600 text-white' : ''
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {/* Selected Property Info */}
      {selectedProperty && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-[1000]">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">${selectedProperty.price.toLocaleString()}</h3>
              <div className="text-xs text-gray-500">Property ID: {selectedProperty._id}</div>
            </div>
            <button 
              onClick={() => setSelectedProperty(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 mb-3">{selectedProperty.address}</p>
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>{selectedProperty.bedrooms} beds</div>
            <div>{selectedProperty.bathrooms} baths</div>
            <div>{selectedProperty.squareFeet.toLocaleString()} sqft</div>
            <div>{selectedProperty.propertyType}</div>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            View Full Details
          </button>
        </div>
      )}
    </>
  )
}