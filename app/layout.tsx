import './globals.css'
import { Pacifico, Poppins } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const pacifico = Pacifico({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
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
      <body className={`${pacifico.variable} ${poppins.variable} font-sans bg-white`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
} 