import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#2c3e50] text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Contact */}
          <div>
            <h5 className="text-[#f39c12] font-semibold mb-4">Contact Information</h5>
            <address className="not-italic text-white/80 text-sm space-y-2">
              <p>P.O. Box 829<br />Witsieshoek, 9870<br />Free State, South Africa</p>
              <p>(058) 713 0048 / 713 2821</p>
              <p>thiboloha@lantic.net</p>
            </address>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="text-[#f39c12] font-semibold mb-4">Quick Links</h5>
            <ul className="text-white/80 text-sm space-y-2 list-none m-0 p-0">
              {[
                ['Home', '/'],
                ['About Us', '/about'],
                ['Programs', '/programs'],
                ['Admissions', '/admissions'],
                ['News', '/news'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#f39c12] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h5 className="text-[#f39c12] font-semibold mb-4">Our Programs</h5>
            <ul className="text-white/80 text-sm space-y-2 list-none m-0 p-0">
              {[
                ['Deaf Learners', '/programs/deaf'],
                ['Blind Learners', '/programs/blind'],
                ['Autistic Learners', '/programs/autistic'],
                ['Intellectual Barriers', '/programs/intellectual'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#f39c12] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="text-[#f39c12] font-semibold mb-4">Follow Us</h5>
            <div className="flex gap-4 mb-4">
              <a
                href="https://web.facebook.com/thiboloha.school.2025"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#f39c12] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@thiboloha.special"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#f39c12] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.84 1.56V6.8a4.85 4.85 0 01-1.07-.11z"/>
                </svg>
              </a>
            </div>
            <p className="text-white/60 text-sm">
              Stay connected for updates and success stories from our amazing learners.
            </p>
          </div>
        </div>

        <hr className="border-white/20 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-white/70 text-sm">
          <p>&copy; 2026 Thiboloha Special School. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#f39c12] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="hover:text-[#f39c12] transition-colors">
              Accessibility Statement
            </Link>
          </div>
        </div>
        <p className="text-center text-white/40 text-xs mt-4">
          Developed and Maintained by PrimeCode Solutions
        </p>
      </div>
    </footer>
  )
}
