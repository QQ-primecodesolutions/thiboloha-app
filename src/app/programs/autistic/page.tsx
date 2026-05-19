import type { Metadata } from 'next'
import { ProgramLayout } from '@/components/program-layout'

export const metadata: Metadata = {
  title: 'Autistic Learners Program',
  description:
    'Structured, sensory-friendly learning environment with individualized support for learners on the autism spectrum at Thiboloha Special School.',
}

const THEME = '#e74c3c'

const stats = [
  { value: 'ABA', label: 'Evidence-Based Methods' },
  { value: '1:6', label: 'Teacher Ratio' },
  { value: 'PECS', label: 'Communication Support' },
  { value: 'CAPS', label: 'Full Curriculum' },
]

const otherPrograms = [
  { label: 'Deaf Learners', href: '/programs/deaf', color: '#4a90e2', description: 'SASL education and technical skills' },
  { label: 'Blind Learners', href: '/programs/blind', color: '#27ae60', description: 'Braille literacy and adaptive technology' },
  { label: 'Intellectual Barriers', href: '/programs/intellectual', color: '#8e44ad', description: 'Life skills and practical education approach' },
]

export default function AutisticProgramPage() {
  return (
    <ProgramLayout
      themeColor={THEME}
      programName="Autistic Learners Program"
      programSlug="autistic"
      tagline="Structured learning environment with individualized support and sensory-friendly approaches for learners on the autism spectrum — celebrating every milestone."
      icon={<span>🧩</span>}
      stats={stats}
      otherPrograms={otherPrograms}
    >
      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Program Overview</h2>
            <p className="text-[#6c757d]">Individualized, evidence-based education for autism spectrum learners</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: THEME }}>
                Our Approach to Autism Education
              </h3>
              <ul className="space-y-3">
                {[
                  ['Structured Environment', 'Predictable routines and visual schedules to reduce anxiety'],
                  ['Individualized Plans', 'IEP developed for each learner with specific goals'],
                  ['Sensory Integration', 'Sensory-friendly classrooms and break spaces'],
                  ['PECS & AAC', 'Picture Exchange Communication System and augmentative aids'],
                  ['ABA Principles', 'Applied Behaviour Analysis woven into daily instruction'],
                  ['Social Skills Groups', 'Facilitated peer interaction and social development'],
                ].map(([title, sub]) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>{title}:</strong> {sub}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src="/images/student.png"
                alt="Autism program classroom"
                className="rounded-xl shadow-lg w-full"
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-[#f8f9fa]" id="curriculum">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Curriculum & Learning Areas</h2>
            <p className="text-[#6c757d]">CAPS-aligned curriculum adapted to meet every learner's unique needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📖', title: 'Academic Literacy', items: ['Reading and phonics with visual support', 'Functional writing skills', 'Comprehension through stories and images'] },
              { icon: '🔢', title: 'Numeracy & Maths', items: ['Concrete-Representational-Abstract (CRA) approach', 'Money, time, and measurement', 'Math manipulatives and visual aids'] },
              { icon: '🧠', title: 'Social & Life Skills', items: ['Greetings and conversation skills', 'Self-care and hygiene routines', 'Community access activities'] },
              { icon: '🎨', title: 'Creative Arts', items: ['Art as communication and expression', 'Music and movement therapy', 'Drama and role-play activities'] },
              { icon: '🏃', title: 'Physical Development', items: ['Sensory diet and movement breaks', 'Gross and fine motor skill development', 'Adaptive physical education'] },
              { icon: '💬', title: 'Communication', items: ['PECS and AAC devices', 'Functional language goals', 'Speech-language therapy sessions'] },
            ].map((a) => (
              <div key={a.title} className="bg-white rounded-2xl p-6 shadow">
                <div className="text-3xl mb-3">{a.icon}</div>
                <h5 className="font-semibold text-[#1e3a8a] mb-3">{a.title}</h5>
                <ul className="space-y-2">
                  {a.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#6c757d]">
                      <span className="text-green-500 mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Specialist Support Services</h2>
            <p className="text-[#6c757d]">A multidisciplinary team supporting every learner</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🗣️', title: 'Speech-Language Therapy', body: 'Individual and group speech therapy sessions targeting functional communication goals.' },
              { icon: '🎯', title: 'Occupational Therapy', body: 'Sensory integration therapy, fine motor development, and ADL training.' },
              { icon: '🧩', title: 'Behaviour Support', body: 'Positive Behaviour Support (PBS) plans, functional behaviour assessments, and crisis intervention.' },
              { icon: '👩‍👧', title: 'Family Involvement', body: 'Parent training programmes, home-school communication books, and family support groups.' },
              { icon: '🏫', title: 'Transition Planning', body: 'Structured transition from school to post-school options including sheltered employment and FET colleges.' },
              { icon: '💊', title: 'Medical Coordination', body: 'Liaison with medical professionals, medication management support, and health monitoring.' },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 shadow">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h5 className="font-semibold text-[#1e3a8a] mb-2">{s.title}</h5>
                <p className="text-sm text-[#6c757d]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ProgramLayout>
  )
}
