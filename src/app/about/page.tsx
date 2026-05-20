import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { StatsCounter } from '@/components/stats-counter'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Thiboloha Special School — 50 years of excellence in special needs education in the Free State, South Africa.',
}

const stats = [
  { value: '50+', label: 'Years of Service' },
  { value: '100%', label: 'NSC Pass Rate' },
  { value: '4', label: 'Specialised Programs' },
  { value: '60+', label: 'Successful Alumni' },
]

const values = [
  {
    icon: '🤝',
    title: 'Inclusion',
    description:
      'Every learner belongs. We create an environment where all students feel welcomed, valued, and empowered.',
  },
  {
    icon: '⭐',
    title: 'Excellence',
    description:
      'We hold ourselves to the highest standards — academically, professionally, and in our care for every learner.',
  },
  {
    icon: '❤️',
    title: 'Compassion',
    description:
      'We understand each learner\'s unique journey and respond with patience, empathy, and dedicated support.',
  },
  {
    icon: '🌱',
    title: 'Growth',
    description:
      'We nurture the whole child — academically, socially, emotionally, and in practical life skills.',
  },
]

const milestones = [
  { year: '1974', event: 'Thiboloha Special School established in Witsieshoek, Free State.' },
  { year: '1990s', event: 'Expansion of programs to include Blind Learners and Autistic Learners streams.' },
  { year: '2011', event: 'Achieved first 100% NSC pass rate — a milestone maintained every year since.' },
  { year: '2019', event: 'Introduction of technical and vocational skills programs for FET learners.' },
  { year: '2024', event: '75% Bachelor passes and 15% Diploma passes in the NSC examinations.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section
          className="text-white py-20"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #16a085 100%)' }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About Thiboloha Special School</h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              For over 50 years we have been transforming lives through quality, inclusive special
              needs education in the Free State, South Africa.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCounter
                stats={stats}
                cardClassName="bg-white rounded-2xl p-8 text-center shadow-sm hover:-translate-y-1 transition-transform"
                numClassName="text-4xl font-bold text-[#1e3a8a] mb-2"
                labelClassName="text-[#2c3e50] font-medium text-sm"
              />
            </div>
          </div>
        </section>

        {/* Our story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">Our Story</h2>
                <div className="space-y-4 text-[#2c3e50] leading-relaxed">
                  <p>
                    Thiboloha Special School was founded in 1974 in Witsieshoek, Free State, with a
                    clear mission: to provide every learner with a disability the quality education
                    they deserve. What began as a small institution has grown into a beacon of
                    excellence, serving deaf, blind, autistic, and intellectually impaired learners
                    from across the province.
                  </p>
                  <p>
                    Our school runs four specialised programs — each staffed by dedicated educators
                    trained in their respective fields, from South African Sign Language (SASL) to
                    Braille instruction and autism support. We cater for learners from preprimary
                    through Grade 12 and FET level, with hostel accommodation available on campus.
                  </p>
                  <p>
                    Since 2011, we have achieved a 100% NSC pass rate every single year — a
                    testament to the commitment of our staff, the resilience of our learners, and the
                    support of our community.
                  </p>
                </div>
              </div>
              <div className="bg-[#f8f9fa] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-6">Key Milestones</h3>
                <ol className="relative border-l-2 border-[#1e3a8a]/20 space-y-6 pl-6">
                  {milestones.map((m) => (
                    <li key={m.year} className="relative">
                      <span className="absolute -left-[1.65rem] top-1 w-4 h-4 rounded-full bg-[#1e3a8a] border-2 border-white" />
                      <span className="text-[#f39c12] font-bold text-sm">{m.year}</span>
                      <p className="text-[#2c3e50] text-sm mt-0.5">{m.event}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-[#1e3a8a] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white/10 rounded-2xl p-8">
                <div className="w-12 h-12 bg-[#f39c12] rounded-full flex items-center justify-center text-xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-white/85 leading-relaxed">
                  To provide holistic, high-quality education that empowers learners with disabilities
                  to reach their full potential — academically, socially, and in practical life skills
                  — so they can participate fully in society.
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-8">
                <div className="w-12 h-12 bg-[#16a085] rounded-full flex items-center justify-center text-xl mb-4">🔭</div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-white/85 leading-relaxed">
                  A South Africa where every learner with a disability has access to excellent
                  specialised education and the opportunity to become an independent, contributing
                  member of their community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1e3a8a] text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl shadow-sm p-8 text-center hover:-translate-y-1 transition-transform">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-[#1e3a8a] text-lg mb-2">{v.title}</h3>
                  <p className="text-[#6c757d] text-sm leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 py-16 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-4">Join Our Community</h2>
            <p className="text-[#6c757d] mb-8 max-w-xl mx-auto">
              Whether you are a prospective parent, a learner, or a supporter, we welcome you to be
              part of the Thiboloha family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admissions"
                className="bg-[#1e3a8a] hover:bg-blue-900 transition-colors text-white font-semibold px-8 py-3 rounded-full"
              >
                Apply for Admission
              </Link>
              <Link
                href="/contact"
                className="border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white transition-colors font-semibold px-8 py-3 rounded-full"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
