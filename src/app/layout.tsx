import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from '@/components/Navbar/Navbar'


const inter = Inter({ subsets: ['latin'], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: 'Moonhealth',
}

export default function RootLayout({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode,
  params: any,
  searchParams: any,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
