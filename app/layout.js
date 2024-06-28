
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import ClientNavbar from './_components/ClientNavbar';
import { AuthProvider } from './contexts/authContext';

export const metadata = {
  title: 'FinZ',
  description: 'A simple expense management app',
}

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <ClientNavbar />
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  )
}