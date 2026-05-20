import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Admissions',
  description:
    'Apply to Thiboloha Special School — learn about our admissions process, eligibility criteria, and how to enrol your child in our specialised programs.',
}

const steps = [
  {
    number: '01',
    title: 'Contact the School',
    description:
      'Get in touch by phone or email to express interest and receive an application pack. We will answer any initial questions about our programs.',
  },
  {
    number: '02',
    title: 'Assessment',
    description:
      'A multidisciplinary team conducts an assessment to understand your child\'s needs and identify the most suitable program.',
  },
  {
    number: '03',
    title: 'Submit Application',
    description:
      'Complete and return the application form together with supporting documents such as a medical or educational diagnosis report.',
  },
  {
    number: '04',
    title: 'Placement & Enrolment',
    description:
      'Once placement is confirmed, you will receive enrolment instructions and information about hostel accommodation if required.',
  },
]

const programs = [
  { title: 'Deaf Learners', href: '/programs/deaf', color: '#4a90e2', description: 'Education delivered through South African Sign Language (SASL) from preprimary through Grade 12.' },
  { title: 'Blind Learners', href: '/programs/blind', color: '#27ae60', description: 'Braille-based instruction, mobility training, and adaptive technology for visually impaired learners.' },
  { title: 'Autistic Learners', href: '/programs/autistic', color: '#e74c3c', description: 'Structured, sensory-friendly learning tailored to autism spectrum needs.' },
  { title: 'Intellectual Barriers', href: '/programs/intellectual', color: '#8e44ad', description: 'Life skills, creative arts, and practical subjects for learners with intellectual disabilities.' },
]

const requirements = [
  'An official diagnosis or assessment report (medical, audiological, ophthalmological, or educational psychologist)',
  'Birth certificate of the learner',
  'Immunisation / health record',
  'Most recent school report (if the learner was previously enrolled elsewhere)',
  'Parent or guardian identity document',
]

export default function AdmissionsPage() {
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
            <h1 className="text-4xl font-bold mb-4">Admissions</h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              Every learner deserves the right support. Find out how to apply and what to expect
              when joining the Thiboloha Special School community.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-8 bg-[#f39c12] hover:bg-orange-500 transition-colors text-white font-semibold px-8 py-3 rounded-full"
            >
              Enquire Now
            </Link>
          </div>
        </section>

        {/* Age & eligibility summary */}
        <section className="bg-gray-50 py-10">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                { label: 'Ages Accepted', value: '3 – 21' },
                { label: 'Phases', value: 'Preprimary · Primary · FET' },
                { label: 'Boarding Available', value: 'Hostel on campus' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl p-6 shadow-sm">
                  <p className="text-2xl font-bold text-[#1e3a8a]">{item.value}</p>
                  <p className="text-[#6c757d] mt-1 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1e3a8a] text-center mb-10">Our Programs</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform"
                >
                  <div className="h-2" style={{ background: p.color }} />
                  <div className="p-6">
                    <h3 className="font-bold text-[#1e3a8a] mb-2">{p.title}</h3>
                    <p className="text-sm text-[#6c757d]">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Application steps */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1e3a8a] text-center mb-12">How to Apply</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#1e3a8a]/10 mb-2">{step.number}</div>
                  <h3 className="font-bold text-[#1e3a8a] text-lg mb-2">{step.title}</h3>
                  <p className="text-[#6c757d] text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Required documents */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8 text-center">Required Documents</h2>
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <span className="text-[#16a085] font-bold mt-0.5">✓</span>
                  <span className="text-[#2c3e50] text-sm">{req}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[#6c757d] text-center">
              Additional documents may be requested depending on the learner&apos;s specific needs.
              Contact us if you are unsure what applies to your situation.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-16 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #16a085 100%)' }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
            <p className="text-white/85 mb-8 max-w-xl mx-auto">
              Our admissions team is here to guide you through every stage of the process. Reach out
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#f39c12] hover:bg-orange-500 transition-colors text-white font-semibold px-8 py-3 rounded-full"
              >
                Contact Us
              </Link>
              <a
                href="tel:+27587130048"
                className="bg-white/20 hover:bg-white/30 transition-colors text-white font-semibold px-8 py-3 rounded-full"
              >
                Call (058) 713 0048
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
