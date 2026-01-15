// components/Sidebar.tsx
'use client'

import { useState } from 'react'
import { Filter, SortAsc, Grid, List, Home, DollarSign, MapPin, Calendar } from 'lucide-react'
import PropertyCard from './PropertyCard'
import FilterPanel from './FilterPanel'

// Static data
const properties = [
  {
    id: 1,
    price: 1295000,
    address: "1234 Main St, Vancouver",
    beds: 3,
    baths: 2,
    sqft: 1200,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
    yearBuilt: 2015,
    lotSize: "0.12 acres"
  },
  {
    id: 2,
    price: 895000,
    address: "567 Oak Ave, Burnaby",
    beds: 2,
    baths: 1,
    sqft: 850,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w-400",
    yearBuilt: 2008,
    lotSize: "0.08 acres"
  },
  {
    id: 3,
    price: 2150000,
    address: "789 Marine Dr, North Vancouver",
    beds: 4,
    baths: 3,
    sqft: 2100,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
    yearBuilt: 2020,
    lotSize: "0.25 acres"
  }
]

export default function Sidebar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [sortBy, setSortBy] = useState('latest')

  return (
    <div className="w-96 border-r border-gray-200 flex flex-col h-full">
      {/* Top Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Properties For Sale</h2>
          <span className="text-gray-600">{properties.length} found</span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
          >
            <option value="latest">Latest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sqft">Square Feet</option>
          </select>
        </div>

        <div className="flex mt-3 space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 py-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            Map View
          </button>
        </div>
      </div>

      {/* Properties List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  )
}