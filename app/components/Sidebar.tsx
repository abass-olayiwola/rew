'use client'

import { useState } from 'react'
import { Filter, SortAsc, Grid, List, Home, DollarSign, MapPin, Calendar } from 'lucide-react'




export default function Sidebar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [sortBy, setSortBy] = useState('latest')

  return (
    <div className="w-50 border-r border-gray-200 flex flex-col h-full ">
      {/* Top Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Properties For Sale</h2>
          
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

     
      
    </div>
  )
}