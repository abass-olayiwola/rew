// components/Dropdown_onMap.tsx
'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface DropdownOnMapProps {
  currentType: string
  onTypeChange: (type: 'forSale' | 'forRent' | 'sold') => void
}

export default function Dropdown_onMap({ currentType, onTypeChange }: DropdownOnMapProps) {
  // Map type value to display text
  const getDisplayText = (type: string) => {
    switch(type) {
      case 'forSale': return 'For Sale'
      case 'forRent': return 'For Rent'
      case 'sold': return 'Sold'
      default: return 'For Sale'
    }
  }

  const options = [
    { value: 'forSale', label: 'For Sale' },
    { value: 'forRent', label: 'For Rent' },
    { value: 'sold', label: 'Sold' }
  ]

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50">
        {getDisplayText(currentType)}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-leave:duration-75"
      >
        <div className="py-1">
          {options.map((option) => (
            <MenuItem key={option.value}>
              {({ active }) => (
                <button
                  onClick={() => onTypeChange(option.value as any)}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block w-full px-4 py-2 text-left text-sm ${
                    currentType === option.value ? 'font-semibold text-blue-600' : ''
                  }`}
                >
                  {option.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}