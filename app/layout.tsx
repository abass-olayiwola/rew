// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'




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
        <div className="flex flex-col h-screen">
          <Header />
          
        </div>
      </body>
    </html>
  )
}