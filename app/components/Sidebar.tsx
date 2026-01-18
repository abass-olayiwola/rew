// components/Sidebar.tsx
'use client'

import { useState, useEffect } from 'react'
import { Filter } from 'lucide-react'
import PropertyCard from './PropertyCard'
import FilterPanel, { FilterState } from './FilterPanel'

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
    lotSize: "0.12 acres",
    listingType: "forSale"
  },
  {
    id: 2,
    price: 895000,
    address: "567 Oak Ave, Burnaby",
    beds: 2,
    baths: 1,
    sqft: 850,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400",
    yearBuilt: 2008,
    lotSize: "0.08 acres",
    listingType: "forSale"
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
    lotSize: "0.25 acres",
    listingType: "forRent"
  },
  {
    id: 4,
    price: 750000,
    address: "321 Pine St, Richmond",
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
    yearBuilt: 2012,
    lotSize: "0.1 acres",
    listingType: "sold"
  },
  {
    id: 5,
    price: 3250,
    address: "654 Beach Ave, Vancouver",
    beds: 1,
    baths: 1,
    sqft: 650,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    yearBuilt: 2018,
    lotSize: "N/A",
    listingType: "forRent"
  }
]

interface SidebarProps {
  currentListingType?: 'forSale' | 'forRent' | 'sold'
}

export default function Sidebar({ currentListingType = 'forSale' }: SidebarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [sortBy, setSortBy] = useState('latest')
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [500000, 2000000],
    bedrooms: null,
    bathrooms: null,
    propertyType: null,
    squareFeet: { min: null, max: null },
    yearBuilt: { from: null, to: null }
  })

  // Filter properties based on listing type and filters
  const filterProperties = () => {
    let result = properties.filter(property => 
      property.listingType === currentListingType
    )

    // Apply price filter
    result = result.filter(property => 
      property.price >= filters.priceRange[0] && 
      property.price <= filters.priceRange[1]
    )

    // Apply bedrooms filter
    if (filters.bedrooms) {
      if (filters.bedrooms === 'Any') {
        // Show all properties regardless of bedrooms
      } else if (filters.bedrooms.includes('+')) {
        const minBeds = parseInt(filters.bedrooms)
        result = result.filter(property => property.beds >= minBeds)
      } else {
        const exactBeds = parseInt(filters.bedrooms)
        result = result.filter(property => property.beds === exactBeds)
      }
    }

    // Apply square feet filter
    if (filters.squareFeet.min !== null) {
      result = result.filter(property => property.sqft >= filters.squareFeet.min!)
    }
    if (filters.squareFeet.max !== null) {
      result = result.filter(property => property.sqft <= filters.squareFeet.max!)
    }

    // Apply year built filter
    if (filters.yearBuilt.from !== null && filters.yearBuilt.from !== 'Any') {
      const fromYear = parseInt(filters.yearBuilt.from)
      result = result.filter(property => property.yearBuilt >= fromYear)
    }
    if (filters.yearBuilt.to !== null && filters.yearBuilt.to !== 'Any') {
      const toYear = parseInt(filters.yearBuilt.to)
      result = result.filter(property => property.yearBuilt <= toYear)
    }

    // Note: Property type filter is not implemented in the property data structure
    // You would need to add a propertyType field to the property objects if you want to use it

    setFilteredProperties(result)
  }

  // Update filtered properties when listing type or filters change
  useEffect(() => {
    filterProperties()
  }, [currentListingType, filters])

  // Handle filter changes from FilterPanel
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  // Get display title based on listing type
  const getTitle = (type: 'forSale' | 'forRent' | 'sold') => {
    switch(type) {
      case 'forSale': return 'Properties For Sale'
      case 'forRent': return 'Properties For Rent'
      case 'sold': return 'Sold Properties'
      default: return 'Properties For Sale'
    }
  }

  // Sort properties based on selected sort option
  const getSortedProperties = () => {
    const sorted = [...filteredProperties]
    
    switch(sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      case 'sqft':
        return sorted.sort((a, b) => b.sqft - a.sqft)
      case 'latest':
      default:
        // Assuming higher ID = newer listing for demo purposes
        return sorted.sort((a, b) => b.id - a.id)
    }
  }

  const sortedProperties = getSortedProperties()

  return (
    <div className="w-96 border-r border-gray-200 flex flex-col h-full">
      {/* Top Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{getTitle(currentListingType)}</h2>
          <span className="text-gray-600">{sortedProperties.length} found</span>
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
        {sortedProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-lg">No properties found</p>
            <p className="text-sm">Try adjusting your filters or selecting a different listing type</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <FilterPanel 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  )
}