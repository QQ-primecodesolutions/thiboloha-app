import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Thiboloha Special School — admissions enquiries, program information, and general contact details.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section
          className="text-white py-16"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #16a085 100%)' }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-white/85 text-lg">
              We'd love to hear from you. Reach out via the form below or contact us directly.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Contact info */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow">
                  <h3 className="font-bold text-[#1e3a8a] mb-3 text-lg">Contact Information</h3>
                  <address className="not-italic space-y-2 text-[#2c3e50]">
                    <p>📍 P.O. Box 829, Witsieshoek, 9870</p>
                    <p>📞 (058) 713 0048 / 713 2821</p>
                    <p>✉️ thiboloha@lantic.net</p>
                  </address>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow">
                  <h3 className="font-bold text-[#1e3a8a] mb-3 text-lg">Office Hours</h3>
                  <dl className="space-y-1 text-sm text-[#2c3e50]">
                    <div className="flex justify-between">
                      <dt>Monday – Friday</dt>
                      <dd className="font-medium">8:00 AM – 4:00 PM</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Weekends</dt>
                      <dd className="font-medium">By appointment</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow">
                  <h3 className="font-bold text-[#1e3a8a] mb-3 text-lg">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://web.facebook.com/thiboloha.school.2025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://www.tiktok.com/@thiboloha.special"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
                    >
                      TikTok
                    </a>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl p-6 shadow">
                  <h3 className="font-bold text-[#1e3a8a] mb-4 text-lg">FAQ</h3>
                  <div className="space-y-4 text-sm">
                    {[
                      { q: 'How do I apply for admission?', a: 'Visit our Admissions page or contact us directly to request an application form.' },
                      { q: 'Does the school have boarding facilities?', a: 'Yes, we have hostel accommodation available. Contact us for availability and costs.' },
                      { q: 'What ages do you accept?', a: 'We accept learners from age 3 (preprimary) through to Grade 12.' },
                    ].map((faq) => (
                      <details key={faq.q} className="group">
                        <summary className="cursor-pointer font-medium text-[#1e3a8a] list-none flex justify-between items-center">
                          {faq.q}
                          <span className="ml-2 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-[#6c757d]">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow">
                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2">Send us a Message</h2>
                <p className="text-[#6c757d] mb-8">
                  Fill in the form below and we'll get back to you within 24 hours on business days.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
