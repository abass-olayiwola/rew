// components/PropertyCard.tsx
'use client'


import { Bed, Bath, Square, MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'

interface PropertyCardProps {
  property: {
    id: number
    price: number
    address: string
    beds: number
    baths: number
    sqft: number
    image: string
    yearBuilt: number
    lotSize: string
    listingType: string

  }
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={property.image}
          alt={property.address}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full font-semibold">
          ${property.price.toLocaleString()}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{property.address}</h3>
        
        <div className="flex items-center space-x-4 mb-3 text-gray-600">
          <div className="flex items-center">
            
            <span>{property.beds} beds</span>
            .
          </div>
          <div className="flex items-center">
            
            <span>{property.baths} baths</span>
            .
          </div>
          
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Built {property.yearBuilt}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.lotSize}</span>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition">
          View Details
        </button>
      </div>
    </div>
  )
}