import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Our Programs',
  description:
    'Discover Thiboloha Special School\'s four specialized programs: Deaf Learners, Blind Learners, Autistic Learners, and Intellectual Barriers — each tailored for excellence.',
}

const programs = [
  { title: 'Deaf Learners Program', href: '/programs/deaf', color: '#4a90e2', icon: '🤲', description: 'Comprehensive education using South African Sign Language (SASL) from preprimary through FET, including technical skills development.' },
  { title: 'Blind Learners Program', href: '/programs/blind', color: '#27ae60', icon: '⠿', description: 'Specialized education for visually impaired learners with Braille instruction, mobility training, and adaptive technology.' },
  { title: 'Autistic Learners Program', href: '/programs/autistic', color: '#e74c3c', icon: '🧩', description: 'Structured learning environment with individualized support and sensory-friendly approaches for autism spectrum learners.' },
  { title: 'Intellectual Barriers Program', href: '/programs/intellectual', color: '#8e44ad', icon: '❤️', description: 'Life skills, creative arts, hospitality training, and practical subjects designed for learners with intellectual disabilities.' },
]

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section
          className="text-white py-20"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #16a085 100%)' }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Our Specialized Programs</h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              Four dedicated programs, each designed to meet the unique needs of our learners and
              empower them to reach their full potential.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {programs.map((p) => (
                <div
                  key={p.href}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform"
                >
                  <div className="h-3" style={{ background: p.color }} />
                  <div className="p-8">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4"
                      style={{ background: p.color }}
                    >
                      {p.icon}
                    </div>
                    <h2 className="text-xl font-bold text-[#1e3a8a] mb-3">{p.title}</h2>
                    <p className="text-[#6c757d] mb-6">{p.description}</p>
                    <Link
                      href={p.href}
                      className="font-semibold px-6 py-2 rounded-full text-white transition-colors hover:opacity-90"
                      style={{ background: p.color }}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
