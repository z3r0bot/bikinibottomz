import './globals.css'
import { Dancing_Script, Raleway } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ShopifyProvider } from './context/ShopifyContext'
import EnvDebug from './components/EnvDebug'

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dancingScript.variable} ${raleway.variable} font-sans bg-white`}>
        <ShopifyProvider>
          <EnvDebug />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ShopifyProvider>
      </body>
    </html>
  )
} 