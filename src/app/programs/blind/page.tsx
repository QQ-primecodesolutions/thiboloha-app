import type { Metadata } from 'next'
import { ProgramLayout } from '@/components/program-layout'

export const metadata: Metadata = {
  title: 'Blind Learners Program',
  description:
    'Specialized education for visually impaired learners with Braille instruction, mobility training, and adaptive technology at Thiboloha Special School.',
}

const THEME = '#27ae60'

const stats = [
  { value: '100%', label: 'NSC Pass Rate' },
  { value: 'Grade R–12', label: 'Full Schooling' },
  { value: 'Braille', label: 'Literacy Medium' },
  { value: '20+', label: 'Alumni' },
]

const otherPrograms = [
  { label: 'Deaf Learners', href: '/programs/deaf', color: '#4a90e2', description: 'SASL education and technical skills' },
  { label: 'Autistic Learners', href: '/programs/autistic', color: '#e74c3c', description: 'Structured learning for autism spectrum learners' },
  { label: 'Intellectual Barriers', href: '/programs/intellectual', color: '#8e44ad', description: 'Life skills and practical education approach' },
]

export default function BlindProgramPage() {
  return (
    <ProgramLayout
      themeColor={THEME}
      programName="Blind Learners Program"
      programSlug="blind"
      tagline="Comprehensive education for visually impaired learners using Braille literacy, mobility training, and adaptive technology to achieve academic excellence and independence."
      icon={<span>⠿</span>}
      stats={stats}
      otherPrograms={otherPrograms}
    >
      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Program Overview</h2>
            <p className="text-[#6c757d]">Empowering independence through excellence in blind education</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: THEME }}>
                Why Choose Our Blind Program?
              </h3>
              <ul className="space-y-3">
                {[
                  ['Braille Excellence', 'Comprehensive Braille literacy from foundation level'],
                  ['Mobility Training', 'Orientation and mobility skills for independence'],
                  ['Adaptive Technology', 'Screen readers and assistive technology integration'],
                  ['100% NSC Pass Rate', 'Consistent academic achievement across all phases'],
                  ['Life Skills', 'Practical independence skills for daily living'],
                  ['Career Guidance', 'Employment preparation and tertiary access support'],
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
                alt="Braille instruction at Thiboloha"
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
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Curriculum & Approach</h2>
            <p className="text-[#6c757d]">Full CAPS curriculum adapted for blind learners at every phase</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                phase: 'Foundation & Intermediate',
                ages: 'Grade R–6',
                items: ['Braille reading and writing (contracted & uncontracted)', 'Perkins Brailler and slate & stylus use', 'Orientation and Mobility (O&M) training', 'Visual efficiency activities where applicable', 'CAPS subjects with adapted materials'],
              },
              {
                phase: 'Senior Phase',
                ages: 'Grade 7–9',
                items: ['Full CAPS subject range in Braille medium', 'Audio-textbook and digital resource access', 'Expanded cane travel and public navigation', 'Life Orientation and social development', 'Introduction to screen-reader technology'],
              },
              {
                phase: 'FET Phase',
                ages: 'Grade 10–12',
                items: ['National Senior Certificate preparation', 'Assistive technology: JAWS, NVDA, Braille displays', 'Electives: Geography, Business Studies, Languages', 'Accommodation in NSC examinations', 'University and career counselling'],
              },
              {
                phase: 'Support Services',
                ages: 'All phases',
                items: ['Low-vision assessment and management', 'Transcription of materials into Braille', 'Audiological services', 'Psychological support', 'Parent and guardian workshops'],
              },
            ].map((s) => (
              <div key={s.phase} className="bg-white rounded-2xl overflow-hidden shadow">
                <div className="p-4" style={{ background: THEME }}>
                  <div className="text-white font-bold">{s.phase}</div>
                  <div className="text-white/80 text-sm">{s.ages}</div>
                </div>
                <div className="p-5">
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#2c3e50]">
                        <span className="text-green-500 mt-0.5">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adaptive tech */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Adaptive Technology & Tools</h2>
            <p className="text-[#6c757d]">State-of-the-art assistive technology supporting every learner</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '⠿', title: 'Braille Tools', items: ['Perkins Brailler', 'Braille slate and stylus', 'Refreshable Braille displays', 'Contracted and uncontracted Braille'] },
              { icon: '💻', title: 'Digital Technology', items: ['Screen readers (JAWS, NVDA)', 'Audio textbooks', 'Accessible tablets and computers', 'Text-to-speech software'] },
              { icon: '🦯', title: 'Mobility & Independence', items: ['Long cane training', 'Electronic travel aids', 'GPS navigation support', 'Daily living skills equipment'] },
            ].map((t) => (
              <div key={t.title} className="bg-white rounded-2xl shadow p-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: THEME, color: 'white' }}>
                  {t.icon}
                </div>
                <h5 className="font-semibold text-[#1e3a8a] mb-3">{t.title}</h5>
                <ul className="text-sm text-[#6c757d] space-y-1 text-left">
                  {t.items.map((i) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-green-500">✓</span> {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ProgramLayout>
  )
}
