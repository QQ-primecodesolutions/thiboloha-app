import type { Metadata } from 'next'
import { ProgramLayout } from '@/components/program-layout'

export const metadata: Metadata = {
  title: 'Intellectual Barriers Program',
  description:
    'Life skills, creative arts, hospitality training, and practical subjects designed for learners with intellectual disabilities at Thiboloha Special School.',
}

const THEME = '#8e44ad'

const stats = [
  { value: 'CAPS', label: 'Adapted Curriculum' },
  { value: 'Life Skills', label: 'Core Focus' },
  { value: 'Vocational', label: 'Training Offered' },
  { value: 'All Levels', label: 'Age Groups Served' },
]

const otherPrograms = [
  { label: 'Deaf Learners', href: '/programs/deaf', color: '#4a90e2', description: 'SASL education and technical skills' },
  { label: 'Blind Learners', href: '/programs/blind', color: '#27ae60', description: 'Braille literacy and adaptive technology' },
  { label: 'Autistic Learners', href: '/programs/autistic', color: '#e74c3c', description: 'Structured learning for autism spectrum learners' },
]

export default function IntellectualProgramPage() {
  return (
    <ProgramLayout
      themeColor={THEME}
      programName="Intellectual Barriers Program"
      programSlug="intellectual"
      tagline="Life skills, creative arts, hospitality training, and practical subjects — empowering learners with intellectual disabilities to live independently and meaningfully."
      icon={<span>❤️</span>}
      stats={stats}
      otherPrograms={otherPrograms}
    >
      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Program Overview</h2>
            <p className="text-[#6c757d]">Practical, life-centred education for learners with intellectual disabilities</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: THEME }}>
                Our Educational Philosophy
              </h3>
              <ul className="space-y-3">
                {[
                  ['CAPS Adapted', 'Full curriculum adapted to the learning pace and style of each learner'],
                  ['Life Skills Focus', 'Practical skills for daily living, personal care, and community participation'],
                  ['Vocational Training', 'Hospitality, agriculture, arts and crafts, and other vocational pathways'],
                  ['Dignity & Inclusion', 'Fostering self-worth, independence, and social inclusion'],
                  ['Family Partnership', 'Strong home-school partnership for consistent support'],
                  ['Transition Support', 'Structured transition to post-school life and supported employment'],
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
                alt="Intellectual barriers program"
                className="rounded-xl shadow-lg w-full"
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>
      </section>

      {/* Learning areas */}
      <section className="py-20 bg-[#f8f9fa]" id="curriculum">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Learning Areas</h2>
            <p className="text-[#6c757d]">Holistic development across academic, practical, and social domains</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📚', title: 'Literacy & Numeracy', items: ['Functional reading and writing', 'Money handling and budgeting', 'Telling time and calendar skills', 'Practical numeracy for daily life'] },
              { icon: '❤️', title: 'Life Orientation & Life Skills', items: ['Personal care and hygiene', 'Health and nutrition', 'Safety skills', 'Emotional wellbeing and relationships'] },
              { icon: '🍳', title: 'Hospitality & Food Production', items: ['Cooking and baking', 'Kitchen hygiene and food safety', 'Table service and catering', 'Food entrepreneurship basics'] },
              { icon: '🌱', title: 'Agriculture & Garden', items: ['Vegetable and herb gardening', 'Composting and soil care', 'Animal husbandry basics', 'Market gardening'] },
              { icon: '🎨', title: 'Creative Arts & Crafts', items: ['Needlework and sewing', 'Pottery and clay work', 'Cane work and weaving', 'Painting and mixed media'] },
              { icon: '🏃', title: 'Physical & Recreation', items: ['Adaptive physical education', 'Swimming and water safety', 'Music and dance therapy', 'Recreational activities and sport'] },
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

      {/* Post-school */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Post-School Pathways</h2>
            <p className="text-[#6c757d]">Preparing learners for meaningful participation beyond school</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🏢', title: 'Supported Employment', body: 'Job coaching, workplace support, and liaison with local employers for inclusive employment opportunities.' },
              { icon: '🏡', title: 'Community Living', body: 'Skills for independent or semi-independent living, including supported housing links and community access.' },
              { icon: '🎓', title: 'Further Education', body: 'Transition to FET colleges, skills training programmes, and adult education where appropriate.' },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-8 shadow">
                <div className="text-4xl mb-3">{p.icon}</div>
                <h5 className="font-semibold text-[#1e3a8a] mb-3">{p.title}</h5>
                <p className="text-sm text-[#6c757d]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ProgramLayout>
  )
}
