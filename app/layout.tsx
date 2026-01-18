// app/layout.tsx
/*
import { useState } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import MapView from './components/MapView'
import Sidebar from './components/Sidebar'




const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Map Search for Real Estate Listings',
  description: 'Find properties for sale and rent',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentListingType, setCurrentListingType] = useState<'forSale' | 'forRent' | 'sold'>('forSale')

  const handleListingTypeChange = (type: 'forSale' | 'forRent' | 'sold') => {
    console.log('Listing type changed in parent:', type)
    setCurrentListingType(type)
  }
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 relative">
              <MapView
              listingType={currentListingType}
              onListingTypeChange={handleListingTypeChange
                
              } />
              {children}
            </main>
            <Sidebar currentListingType={currentListingType} />
          </div>

        </div>
      </body>
    </html>
  )
}
*/




// app/layout.tsx

import './globals.css'
import { Inter } from 'next/font/google'
import ClientWrapper from './components/ClientWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Map Search for Real Estate Listings',
  description: 'Find properties for sale and rent',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}