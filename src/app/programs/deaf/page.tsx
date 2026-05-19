import type { Metadata } from 'next'
import { ProgramLayout } from '@/components/program-layout'

export const metadata: Metadata = {
  title: 'Deaf Learners Program',
  description:
    'Comprehensive deaf education from preprimary to FET using South African Sign Language (SASL). Technical skills development and 100% NSC pass rate.',
}

const THEME = '#4a90e2'

const stats = [
  { value: '100%', label: 'NSC Pass Rate' },
  { value: '75%', label: 'Bachelor Passes (2024)' },
  { value: '13', label: 'Years of Education' },
  { value: '25+', label: 'Successful Alumni' },
]

const otherPrograms = [
  { label: 'Blind Learners', href: '/programs/blind', color: '#27ae60', description: 'Braille literacy and adaptive technology education' },
  { label: 'Autistic Learners', href: '/programs/autistic', color: '#e74c3c', description: 'Structured learning for autism spectrum learners' },
  { label: 'Intellectual Barriers', href: '/programs/intellectual', color: '#8e44ad', description: 'Life skills and practical education approach' },
]

const phases = [
  {
    title: 'Preprimary Phase',
    age: 'Ages 3–7',
    grade: 'Early Learning Foundation',
    heading: 'Early Language Development',
    body: 'Foundation phase focusing on SASL acquisition, pre-literacy skills, and social development in a deaf-friendly environment.',
    items: [
      { icon: '🤲', title: 'SASL Fundamentals', sub: 'Basic sign language vocabulary and communication skills' },
      { icon: '🔷', title: 'Pre-Literacy & Numeracy', sub: 'Visual learning approaches to reading and number concepts' },
      { icon: '👥', title: 'Social Skills', sub: 'Interaction and communication within deaf community' },
    ],
  },
  {
    title: 'Foundation Phase',
    age: 'Grade R–3',
    grade: 'Academic Foundation',
    heading: 'Core Academic Skills',
    body: 'Building strong foundations in literacy, numeracy, and life skills using SASL as the primary language of instruction.',
    items: [
      { icon: '📖', title: 'Sesotho & English', sub: 'Written language development alongside SASL' },
      { icon: '🔢', title: 'Mathematics', sub: 'Visual and practical mathematics instruction' },
      { icon: '❤️', title: 'Life Skills & SASL', sub: 'Personal development and advanced sign language' },
    ],
  },
  {
    title: 'Intermediate Phase',
    age: 'Grade 4–6',
    grade: 'Skill Development',
    heading: 'Expanded Learning',
    body: 'Introduction of Natural Science and Technology alongside continued development of core subjects through SASL instruction.',
    items: [
      { icon: '📚', title: 'Sesotho & English', sub: 'Advanced literacy and comprehension skills' },
      { icon: '🔬', title: 'Mathematics & NST', sub: 'Natural Science and Technology introduction' },
      { icon: '🤲', title: 'Life Skills & SASL', sub: 'Comprehensive life preparation and advanced SASL' },
    ],
  },
  {
    title: 'Senior Phase',
    age: 'Grade 7–9',
    grade: 'Pre-Secondary Preparation',
    heading: 'Comprehensive Education',
    body: 'Full subject range including specialized subjects, preparing students for FET phase and NSC examinations.',
    items: [
      { icon: '🌍', title: 'Languages & Life Orientation', sub: 'Sesotho, English, SASL, LO, EMS' },
      { icon: '⚛️', title: 'Sciences & Technology', sub: 'Mathematics, Technology, Creative Arts, Natural Science' },
    ],
  },
]

const technicalSkills = [
  {
    icon: '🔥',
    title: 'Welding & Metalwork',
    body: 'Professional welding techniques and metalworking skills preparing students for careers in construction, manufacturing, and repair industries.',
    items: ['Arc welding techniques', 'Metal fabrication', 'Safety protocols', 'Equipment maintenance'],
  },
  {
    icon: '🔨',
    title: 'Woodworking & Construction',
    body: 'Comprehensive woodworking and construction skills including furniture making, carpentry, and building techniques.',
    items: ['Furniture construction', 'Carpentry techniques', 'Tool usage and maintenance', 'Project planning'],
  },
  {
    icon: '🍽️',
    title: 'Hospitality & Food Production',
    body: 'Professional cooking, baking, and hospitality management skills preparing students for careers in the food service industry.',
    items: ['Professional cooking', 'Baking and pastry', 'Food safety standards', 'Customer service'],
  },
  {
    icon: '🌱',
    title: 'Agriculture & Horticulture',
    body: 'Sustainable farming practices, vegetable gardening, and agricultural business principles.',
    items: ['Vegetable production', 'Soil management', 'Sustainable practices'],
  },
  {
    icon: '🎨',
    title: 'Creative Arts & Crafts',
    body: 'Traditional and contemporary crafts including needlework, pottery, and cane work for cultural preservation and entrepreneurship.',
    items: ['Traditional needlework', 'Pottery and ceramics', 'Cane work and basketry'],
  },
]

const alumni = [
  {
    quote: 'Thiboloha gave me the foundation I needed to pursue higher education. The SASL instruction and academic support prepared me for university success.',
    name: 'Mohapi Tsholo',
    achievement: 'Graduated 2013 • Degree in Journalism, University of Pretoria',
  },
  {
    quote: 'The technical skills I learned at Thiboloha opened doors to immediate employment. I\'m now helping other students achieve their dreams.',
    name: 'Letseleha Kgopiso',
    achievement: 'Graduated 2016 • B.Ed (UFS) • Teacher at Thiboloha School',
  },
  {
    quote: 'From learning basic skills to working in a professional environment, Thiboloha\'s program gave me confidence and competence.',
    name: 'Mthimkulu Thabo',
    achievement: 'Graduated 2012 • IT Qualification • Class Assistant at Dominican School',
  },
  {
    quote: 'The practical training in woodworking has given me a sustainable career and the ability to support my family.',
    name: 'Ndaba Mbhekeni',
    achievement: 'Graduated 2012 • Working at Durban Woodwork Company',
  },
]

export default function DeafProgramPage() {
  return (
    <ProgramLayout
      themeColor={THEME}
      programName="Deaf Learners Program"
      programSlug="deaf"
      tagline="Comprehensive education using South African Sign Language (SASL) from preprimary through FET, empowering deaf learners to achieve academic excellence and career success."
      icon={<span>🤲</span>}
      stats={stats}
      otherPrograms={otherPrograms}
    >
      {/* Program overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Program Overview</h2>
            <p className="text-[#6c757d]">Excellence in deaf education through innovative teaching and SASL immersion</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: THEME }}>
                Why Choose Our Deaf Program?
              </h3>
              <ul className="space-y-3">
                {[
                  ['100% NSC Pass Rate', 'Consistent academic excellence from 2011–2024'],
                  ['SASL Immersion', 'Full curriculum delivery in South African Sign Language'],
                  ['Technical Skills', 'Practical training in welding, woodworking, and hospitality'],
                  ['University Preparation', 'Bachelor pass achievements opening tertiary opportunities'],
                  ['Deaf Culture Integration', 'Celebrating and preserving deaf identity and community'],
                  ['Career Pathways', 'Alumni working in universities, businesses, and skilled trades'],
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
                alt="SASL classroom instruction"
                className="rounded-xl shadow-lg w-full"
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education phases */}
      <section className="py-20 bg-[#f8f9fa]" id="curriculum">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Education Phases</h2>
            <p className="text-[#6c757d]">Comprehensive learning journey from early childhood to career readiness</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {phases.map((phase) => (
              <div key={phase.title} className="bg-white rounded-2xl overflow-hidden shadow">
                <div className="p-5" style={{ background: THEME }}>
                  <div className="text-white font-bold text-lg">{phase.title}</div>
                  <div className="text-white/80 text-sm">{phase.age} · {phase.grade}</div>
                </div>
                <div className="p-6">
                  <h5 className="font-semibold mb-2" style={{ color: THEME }}>{phase.heading}</h5>
                  <p className="text-[#6c757d] text-sm mb-4">{phase.body}</p>
                  <ul className="space-y-3">
                    {phase.items.map((item) => (
                      <li key={item.title} className="flex items-start gap-3 text-sm">
                        <span>{item.icon}</span>
                        <div>
                          <strong>{item.title}</strong>
                          <br />
                          <span className="text-[#6c757d]">{item.sub}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical skills */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Technical Skills Development</h2>
            <p className="text-[#6c757d]">Practical training preparing students for immediate employment and entrepreneurship</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {technicalSkills.map((skill) => (
              <div key={skill.title} className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="p-5 flex items-center gap-3" style={{ background: THEME }}>
                  <span className="text-2xl">{skill.icon}</span>
                  <h5 className="text-white font-semibold">{skill.title}</h5>
                </div>
                <div className="p-5">
                  <p className="text-[#6c757d] text-sm mb-4">{skill.body}</p>
                  <ul className="space-y-1">
                    {skill.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <span className="text-green-500">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-3">Alumni Success Stories</h2>
            <p className="text-[#6c757d]">Inspiring achievements of our deaf graduates</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {alumni.map((a) => (
              <div key={a.name} className="bg-white rounded-2xl p-6 shadow border-l-4" style={{ borderColor: THEME }}>
                <p className="text-[#2c3e50] italic mb-4">"{a.quote}"</p>
                <p className="font-semibold text-[#1e3a8a]">{a.name}</p>
                <p className="text-sm text-[#6c757d]">{a.achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ProgramLayout>
  )
}
