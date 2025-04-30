import './globals.css'
import { Dancing_Script, Raleway } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ShopifyProvider } from './context/ShopifyContext'
import ClientProviders from './components/ClientProviders'

const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
})

export const metadata = {
  title: 'Bikini Bottoms',
  description: 'Your premier destination for beachwear and accessories',
  metadataBase: new URL('https://bikinibottoms.shop'),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dancingScript.variable} ${raleway.variable} font-sans bg-white`}>
        <ClientProviders>
          <ShopifyProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ShopifyProvider>
        </ClientProviders>
      </body>
    </html>
  )
} 