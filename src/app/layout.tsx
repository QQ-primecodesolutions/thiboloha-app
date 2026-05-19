import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Thiboloha Special School - Excellence in Special Needs Education',
    template: '%s | Thiboloha Special School',
  },
  description:
    'Thiboloha Special School — 50 years of excellence in special needs education. Serving deaf, blind, autistic, and intellectually impaired learners in Free State, South Africa.',
  metadataBase: new URL('https://qq-primecodesolutions.github.io/thiboloha/'),
  keywords: [
    'special needs education',
    'deaf learners',
    'blind learners',
    'autism education',
    'intellectual disabilities',
    'special school',
    'Free State',
    'South Africa',
    'SASL',
    'Braille',
  ],
  authors: [{ name: 'Thiboloha Special School' }],
  openGraph: {
    siteName: 'Thiboloha Special School',
    locale: 'en_ZA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
