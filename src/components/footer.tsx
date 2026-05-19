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
                className="text-white hover:text-[#f39c12] transition-colors text-xl"
              >
                f
              </a>
              <a
                href="https://www.tiktok.com/@thiboloha.special"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#f39c12] transition-colors text-xl"
              >
                t
              </a>
            </div>
            <p className="text-white/60 text-sm">
              Stay connected for updates and success stories from our amazing learners.
            </p>
          </div>
        </div>

        <hr className="border-white/20 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-white/70 text-sm">
          <p>&copy; 2025 Thiboloha Special School. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#f39c12] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="hover:text-[#f39c12] transition-colors">
              Accessibility Statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
