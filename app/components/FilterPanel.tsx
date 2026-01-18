// components/FilterPanel.tsx
'use client'

import { X, DollarSign, Bed, Bath, Square, Home } from 'lucide-react'
import * as Slider from '@radix-ui/react-slider'
import { useState } from 'react'

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  priceRange: [number, number]
  bedrooms: string | null
  bathrooms: string | null
  propertyType: string | null
  squareFeet: {
    min: number | null
    max: number | null
  }
  yearBuilt: {
    from: string | null
    to: string | null
  }
}

export default function FilterPanel({ isOpen, onClose, filters, onFilterChange }: FilterPanelProps) {
  if (!isOpen) return null

  const [localFilters, setLocalFilters] = useState<FilterState>(filters)

  const handleApply = () => {
    onFilterChange(localFilters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters: FilterState = {
      priceRange: [500000, 2000000],
      bedrooms: null,
      bathrooms: null,
      propertyType: null,
      squareFeet: { min: null, max: null },
      yearBuilt: { from: null, to: null }
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const handlePriceChange = (values: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: [values[0], values[1]]
    }))
  }

  const handleBedroomsChange = (bedrooms: string) => {
    setLocalFilters(prev => ({
      ...prev,
      bedrooms: prev.bedrooms === bedrooms ? null : bedrooms
    }))
  }

  const handlePropertyTypeChange = (type: string) => {
    setLocalFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType === type ? null : type
    }))
  }

  const handleSquareFeetChange = (field: 'min' | 'max', value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      squareFeet: {
        ...prev.squareFeet,
        [field]: value === '' ? null : parseInt(value)
      }
    }))
  }

  const handleYearBuiltChange = (field: 'from' | 'to', value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      yearBuilt: {
        ...prev.yearBuilt,
        [field]: value === 'Any' ? null : value
      }
    }))
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${value / 1000000}M`
    } else if (value >= 1000) {
      return `$${value / 1000}K`
    }
    return `$${value}`
  }

  const bedroomOptions = ['Any', '1+', '2+', '3+', '4+', '5+']
  const propertyTypes = ['House', 'Apartment', 'Townhouse', 'Condo', 'Land', 'Multi-Family']
  const yearOptions = ['Any', '2024', '2020', '2010', '2000', '1990', '1980']

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-y-0 left-0 w-96 bg-white shadow-xl">
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="font-medium">Price Range</label>
              <span className="text-sm text-gray-600">
                {formatCurrency(localFilters.priceRange[0])} - {formatCurrency(localFilters.priceRange[1])}
              </span>
            </div>
            <div className="space-y-4">
              <Slider.Root
                className="relative flex items-center w-full h-5"
                value={localFilters.priceRange}
                min={0}
                max={5000000}
                step={10000}
                onValueChange={handlePriceChange}
              >
                <Slider.Track className="bg-gray-200 relative flex-1 rounded-full h-2">
                  <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-blue-600 rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-blue-600 rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </Slider.Root>
              <div className="flex justify-between text-sm text-gray-600">
                <span>$0</span>
                <span>$2.5M</span>
                <span>$5M+</span>
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="mb-6">
            <label className="block mb-3 font-medium">Bedrooms</label>
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map((bed) => (
                <button
                  key={bed}
                  onClick={() => handleBedroomsChange(bed)}
                  className={`px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors ${
                    localFilters.bedrooms === bed 
                      ? 'bg-blue-50 border-blue-500 text-blue-600' 
                      : 'border-gray-300'
                  }`}
                >
                  {bed}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div className="mb-6">
            <label className="block mb-3 font-medium">Property Type</label>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handlePropertyTypeChange(type)}
                  className={`px-4 py-3 border rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors ${
                    localFilters.propertyType === type
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  <Home className="h-4 w-4 mr-2" />
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Square Feet */}
          <div className="mb-6">
            <label className="block mb-3 font-medium">Square Feet</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600">Min</label>
                <input
                  type="number"
                  value={localFilters.squareFeet.min || ''}
                  onChange={(e) => handleSquareFeetChange('min', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Max</label>
                <input
                  type="number"
                  value={localFilters.squareFeet.max || ''}
                  onChange={(e) => handleSquareFeetChange('max', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                  placeholder="3000"
                />
              </div>
            </div>
          </div>

          {/* Year Built */}
          <div className="mb-6">
            <label className="block mb-3 font-medium">Year Built</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600">From</label>
                <select 
                  value={localFilters.yearBuilt.from || 'Any'}
                  onChange={(e) => handleYearBuiltChange('from', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                >
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">To</label>
                <select 
                  value={localFilters.yearBuilt.to || 'Any'}
                  onChange={(e) => handleYearBuiltChange('to', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                >
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6 border-t">
            <button
              onClick={handleReset}
              className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset All
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}