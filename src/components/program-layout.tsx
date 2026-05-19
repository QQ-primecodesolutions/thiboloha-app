import { Navbar } from './navbar'
import { Footer } from './footer'
import Link from 'next/link'

interface ProgramLayoutProps {
  children: React.ReactNode
  themeColor: string
  programName: string
  programSlug: string
  tagline: string
  icon: React.ReactNode
  stats: { value: string; label: string }[]
  otherPrograms: { label: string; href: string; color: string; description: string }[]
}

export function ProgramLayout({
  children,
  themeColor,
  programName,
  programSlug,
  tagline,
  icon,
  stats,
  otherPrograms,
}: ProgramLayoutProps) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Program hero */}
        <section
          className="text-white py-20 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, #1e3a8a 0%, ${themeColor} 100%)` }}
        >
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-6">
              <ol className="flex gap-2 text-sm text-white/80 list-none m-0 p-0">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/programs" className="hover:text-white transition-colors">
                    Programs
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white" aria-current="page">
                  {programName}
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                >
                  {icon}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">{programName}</h1>
                <p className="text-lg text-white/90 mb-6 max-w-xl">{tagline}</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#curriculum"
                    className="bg-[#f39c12] text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-500 transition-colors"
                  >
                    View Curriculum
                  </a>
                  <Link
                    href="/admissions"
                    className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-[#1e3a8a] transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/hero-image.jpg"
                  alt={`${programName} at Thiboloha Special School`}
                  className="rounded-xl shadow-2xl w-full object-cover"
                  suppressHydrationWarning
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="bg-[#f8f9fa] py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-4xl font-bold mb-1"
                    style={{ color: themeColor }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[#6c757d] font-medium text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Page-specific content */}
        {children}

        {/* Other programs nav */}
        <section className="py-16 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center text-[#1e3a8a] mb-2">
              Explore Our Other Programs
            </h3>
            <p className="text-center text-[#6c757d] mb-8">
              Discover comprehensive special needs education across all disability areas
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {otherPrograms.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="block bg-white rounded-xl p-6 shadow hover:shadow-md transition-shadow text-center group"
                >
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold"
                    style={{ background: p.color }}
                  >
                    ●
                  </div>
                  <h6 className="font-semibold text-[#1e3a8a] mb-1 group-hover:underline">
                    {p.label}
                  </h6>
                  <p className="text-sm text-[#6c757d]">{p.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#1e3a8a] text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Join Our {programName}?</h2>
            <p className="text-white/80 text-lg mb-8">
              Give your child the opportunity to thrive in an environment designed for their unique needs.
              Our proven track record speaks for itself.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/admissions"
                className="bg-[#f39c12] text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-500 transition-colors"
              >
                Start Application Process
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#1e3a8a] transition-colors"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
