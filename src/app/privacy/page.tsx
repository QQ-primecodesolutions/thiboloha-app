import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Thiboloha Special School website.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section
          className="text-white py-20"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #16a085 100%)' }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              How Thiboloha Special School collects, uses, and protects your information.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl space-y-10 text-[#2c3e50] leading-relaxed">

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-3">1. Information We Collect</h2>
              <p>
                When you use the contact form on this website, we collect the information you provide
                voluntarily: your name, phone number, email address (optional), the program you are
                enquiring about, and your message.
              </p>
              <p className="mt-3">
                We do not use cookies for tracking or advertising. Standard server logs (IP address,
                browser type, page visited) are retained for security purposes and discarded within
                30 days.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-3">2. How We Use Your Information</h2>
              <p>We use the information you submit solely to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-[#2c3e50]">
                <li>Respond to your enquiry or application</li>
                <li>Contact you about the program you selected</li>
                <li>Maintain a record of parent and guardian communications</li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or share your personal information with third parties for
                marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-3">3. Data Retention</h2>
              <p>
                Contact submissions are retained for as long as necessary to respond to your enquiry
                and for record-keeping in line with South African school administration requirements.
                You may request deletion of your data at any time by contacting us directly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-3">4. Security</h2>
              <p>
                Your data is stored in a secure, encrypted database. Access is restricted to
                authorised school administration staff only. We take reasonable precautions to
                protect against unauthorised access, alteration, or disclosure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-3">5. Your Rights (POPIA)</h2>
              <p>
                In accordance with the Protection of Personal Information Act (POPIA) No. 4 of 2013,
                you have the right to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-[#2c3e50]">
                <li>Know what personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:thiboloha@lantic.net" className="text-[#1e3a8a] underline hover:text-[#16a085]">
                  thiboloha@lantic.net
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-3">6. Contact</h2>
              <p>
                If you have questions about this Privacy Policy, please reach out to us:
              </p>
              <address className="not-italic mt-3 bg-gray-50 rounded-xl p-6 text-sm">
                <strong>Thiboloha Special School</strong><br />
                P.O. Box 829, Witsieshoek, 9870<br />
                Free State, South Africa<br />
                Tel: (058) 713 0048 / 713 2821<br />
                Email: <a href="mailto:thiboloha@lantic.net" className="text-[#1e3a8a] underline">thiboloha@lantic.net</a>
              </address>
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
