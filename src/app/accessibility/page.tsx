import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Accessibility Statement for Thiboloha Special School website.',
}

const features = [
  {
    title: 'Keyboard Navigation',
    description:
      'All interactive elements are reachable and operable using a keyboard alone. Focus indicators are visible throughout the site.',
  },
  {
    title: 'Screen Reader Support',
    description:
      'Pages use semantic HTML landmarks, proper heading hierarchy, and ARIA labels so screen readers can present content clearly.',
  },
  {
    title: 'Alternative Text',
    description:
      'All meaningful images include descriptive alternative text. Decorative images are hidden from assistive technology.',
  },
  {
    title: 'Colour Contrast',
    description:
      'Text and interactive elements meet WCAG 2.1 AA contrast requirements to ensure readability for users with low vision.',
  },
  {
    title: 'Responsive Layout',
    description:
      'The site adapts to all screen sizes and supports up to 200% zoom without loss of content or functionality.',
  },
  {
    title: 'Skip Links',
    description:
      'A skip-to-main-content link allows keyboard and screen reader users to bypass repeated navigation on every page.',
  },
]

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section
          className="text-white py-20"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #16a085 100%)' }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              Thiboloha Special School is committed to making this website accessible to everyone,
              including people with disabilities.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-[#2c3e50] leading-relaxed space-y-10">

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-3">Our Commitment</h2>
              <p>
                As a school dedicated to learners with disabilities, accessibility is not an
                afterthought — it is a core value. We strive to conform to the Web Content
                Accessibility Guidelines (WCAG) 2.1 Level AA, ensuring our website is perceivable,
                operable, understandable, and robust for all users.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">Accessibility Features</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((f) => (
                  <div key={f.title} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-[#1e3a8a] mb-2">{f.title}</h3>
                    <p className="text-sm text-[#6c757d] leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-3">Known Limitations</h2>
              <p>
                While we work to meet WCAG 2.1 AA, some third-party content and embedded media may
                not fully conform. We are actively working to improve these areas. If you encounter
                a barrier, please contact us and we will address it promptly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-3">Feedback & Contact</h2>
              <p>
                If you experience any difficulty accessing content on this website, or if you need
                information in an alternative format, please contact us:
              </p>
              <address className="not-italic mt-4 bg-gray-50 rounded-xl p-6 text-sm">
                <strong>Thiboloha Special School</strong><br />
                P.O. Box 829, Witsieshoek, 9870<br />
                Free State, South Africa<br />
                Tel: (058) 713 0048 / 713 2821<br />
                Email:{' '}
                <a href="mailto:thiboloha@lantic.net" className="text-[#1e3a8a] underline hover:text-[#16a085]">
                  thiboloha@lantic.net
                </a>
              </address>
              <p className="mt-4">
                We aim to respond to accessibility feedback within 5 business days.
              </p>
            </div>

            <p className="text-sm text-[#6c757d]">Last updated: May 2026</p>
          </div>
        </section>

        <section className="bg-gray-50 py-12 text-center">
          <div className="container mx-auto px-4">
            <Link
              href="/"
              className="bg-[#1e3a8a] hover:bg-blue-900 transition-colors text-white font-semibold px-8 py-3 rounded-full"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
