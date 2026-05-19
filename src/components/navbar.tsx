'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'

const programs = [
  { label: 'Deaf Learners', href: '/programs/deaf' },
  { label: 'Blind Learners', href: '/programs/blind' },
  { label: 'Autistic Learners', href: '/programs/autistic' },
  { label: 'Intellectual Barriers', href: '/programs/intellectual' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)

  return (
    <header>
      {/* Top bar */}
      <div className="bg-[#1e3a8a] text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between gap-1">
          <span>Tel: (058) 713 0048 / 713 2821</span>
          <span>thiboloha@lantic.net</span>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className="bg-white shadow-md sticky top-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" aria-label="Thiboloha Special School Homepage" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Thiboloha Special School Logo"
              className="h-14 w-auto object-contain"
            />
            <img
              src="/images/logo2.png"
              alt=""
              className="h-14 w-auto object-contain hidden sm:block"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
            {navLinks.slice(0, 2).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 font-medium text-[#2c3e50] hover:text-[#1e3a8a] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Programs dropdown */}
            <li className="relative">
              <button
                onClick={() => setProgramsOpen(!programsOpen)}
                onBlur={() => setTimeout(() => setProgramsOpen(false), 150)}
                className="flex items-center gap-1 px-4 py-2 font-medium text-[#2c3e50] hover:text-[#1e3a8a] transition-colors"
                aria-expanded={programsOpen}
              >
                Programs <ChevronDown className="w-4 h-4" />
              </button>
              {programsOpen && (
                <ul className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-48 list-none m-0 p-2">
                  {programs.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="block px-4 py-2 text-sm text-[#2c3e50] hover:bg-gray-50 hover:text-[#1e3a8a] rounded transition-colors"
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {navLinks.slice(2).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 font-medium text-[#2c3e50] hover:text-[#1e3a8a] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-white px-4 pb-4">
            <ul className="flex flex-col gap-1 list-none m-0 p-0 pt-2">
              {navLinks.slice(0, 2).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 font-medium text-[#2c3e50] hover:text-[#1e3a8a]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="block px-3 py-2 font-semibold text-[#1e3a8a] text-sm uppercase tracking-wide">
                  Programs
                </span>
                <ul className="list-none m-0 p-0 pl-3">
                  {programs.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="block px-3 py-2 text-sm text-[#2c3e50] hover:text-[#1e3a8a]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {navLinks.slice(2).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 font-medium text-[#2c3e50] hover:text-[#1e3a8a]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
