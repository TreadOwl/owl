import type { Metadata } from 'next'
import {
  Cormorant_Unicase,
  MedievalSharp,
  Cinzel_Decorative,
} from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Unicase({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: '400',
})

const medieval = MedievalSharp({
  variable: '--font-medieval',
  subsets: ['latin'],
  weight: '400',
})

const cinzel = Cinzel_Decorative({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'TreadOwl',
  description: 'XMPLR - owl, trd',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${medieval.variable} ${cinzel.variable}
      max-w-7xl mx-auto h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col border-l border-r border-white"
      >
        {children}
      </body>
    </html>
  )
}
