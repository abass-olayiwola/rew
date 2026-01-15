// components/FilterPanel.tsx
'use client'

import { X, DollarSign, Bed, Bath, Square, Home } from 'lucide-react'
import * as Slider from '@radix-ui/react-slider'

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-y-0 left-0 w-96 bg-white shadow-xl">
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block mb-3 font-medium">Price Range</label>
            <div className="space-y-4">
              <Slider.Root
                className="relative flex items-center w-full h-5"
                defaultValue={[500000, 2000000]}
                min={0}
                max={5000000}
                step={10000}
              >
                <Slider.Track className="bg-gray-200 relative flex-1 rounded-full h-2">
                  <Slider.Range className="absolute bg-primary rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-primary rounded-full hover:scale-110 focus:outline-none" />
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-primary rounded-full hover:scale-110 focus:outline-none" />
              </Slider.Root>
              <div className="flex justify-between text-sm text-gray-600">
                <span>$500K</span>
                <span>$2M</span>
                <span>$5M+</span>
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="mb-6">
            <label className="block mb-3 font-medium">Bedrooms</label>
            <div className="flex flex-wrap gap-2">
              {['Any', '1+', '2+', '3+', '4+', '5+'].map((bed) => (
                <button
                  key={bed}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
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
              {['House', 'Apartment', 'Townhouse', 'Condo', 'Land', 'Multi-Family'].map((type) => (
                <button
                  key={type}
                  className="px-4 py-3 border rounded-lg hover:bg-gray-50 flex items-center justify-center"
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
                  className="w-full p-2 border rounded-lg"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Max</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg"
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
                <select className="w-full p-2 border rounded-lg">
                  <option>Any</option>
                  <option>2020</option>
                  <option>2010</option>
                  <option>2000</option>
                  <option>1990</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">To</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Any</option>
                  <option>2024</option>
                  <option>2020</option>
                  <option>2010</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}