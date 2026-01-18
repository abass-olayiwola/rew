// app/ClientWrapper.tsx
'use client'

import { useState } from 'react'
import Header from '../components/Header'
import MapView from '../components/MapView'
import Sidebar from '../components/Sidebar'

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentListingType, handleListingTypeChange] = useState<'forSale' | 'forRent' | 'sold'>('forSale')

    
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 relative">
          <MapView
            listingType={currentListingType}
            onListingTypeChange={handleListingTypeChange}
          />
          {children}
        </main>
        <Sidebar currentListingType={currentListingType} />
      </div>
    </div>
  )
}