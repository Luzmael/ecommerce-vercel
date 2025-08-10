import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MultiTienda Vercel',
  description: 'Sistema multi-tienda completo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
