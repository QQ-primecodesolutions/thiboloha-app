import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { db } from '@/lib/db'

const programs = [
  {
    icon: '🤲',
    title: 'Deaf Learners Program',
    description:
      'Comprehensive education using South African Sign Language (SASL) from preprimary through FET, including technical skills development.',
    href: '/programs/deaf',
    color: '#4a90e2',
  },
  {
    icon: '⠿',
    title: 'Blind Learners Program',
    description:
      'Specialized education for visually impaired learners with Braille instruction, mobility training, and adaptive technology.',
    href: '/programs/blind',
    color: '#27ae60',
  },
  {
    icon: '🧩',
    title: 'Autistic Learners Program',
    description:
      'Structured learning environment with individualized support and sensory-friendly approaches for learners on the autism spectrum.',
    href: '/programs/autistic',
    color: '#e74c3c',
  },
  {
    icon: '❤️',
    title: 'Intellectual Barriers Program',
    description:
      'Life skills, creative arts, hospitality training, and practical subjects designed for learners with intellectual disabilities.',
    href: '/programs/intellectual',
    color: '#8e44ad',
  },
]

const stats = [
  { value: '50', label: 'Years of Excellence' },
  { value: '100%', label: 'NSC Pass Rate' },
  { value: '4', label: 'Specialized Programs' },
  { value: '60+', label: 'Successful Alumni' },
]

const achievements = [
  {
    icon: '🎓',
    title: '100% NSC Pass Rate',
    description:
      'Consistent 100% pass rate in National Senior Certificate from 2011–2024, with many learners achieving Bachelor and Diploma passes.',
  },
  {
    icon: '👥',
    title: 'Successful Alumni Network',
    description:
      'Our graduates work in universities, hospitals, courts, and various industries across South Africa, proving that barriers can be overcome.',
  },
  {
    icon: '🏆',
    title: 'Recognition & Support',
    description:
      'Supported by foundations and recognized for our commitment to transforming lives through quality special needs education.',
  },
]

const staticNews = [
  {
    image: '/images/hollyhood.jpg',
    date: 'March 2024',
    title: 'Hollywood Foundation Back to School Support',
    description:
      'The Hollywood Foundation provided essential school supplies and shoes for our learners, supporting their educational journey.',
    href: 'https://hollywoodfoundation.co.za/programmes/corporate-social-investment/back-to-school-campaign/thiboloha-school-back-to-school/',
    external: true,
  },
  {
    image: '/images/news2.png',
    date: 'December 2024',
    title: 'Exceptional 2024 NSC Results',
    description:
      'Our Grade 12 learners achieved another 100% pass rate with 75% Bachelor passes and 15% Diploma passes.',
    href: '/news',
    external: false,
  },
  {
    image: '/images/news3.jpg',
    date: 'January 2025',
    title: 'New Skills Development Programs',
    description:
      'Expanding our technical skills offerings with new workshops in hospitality, agriculture, and entrepreneurship.',
    href: '/news',
    external: false,
  },
]

async function getLatestNews() {
  try {
    return await db.newsPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const dbNews = await getLatestNews()

  const newsItems =
    dbNews.length > 0
      ? dbNews.map((post) => ({
          image: '/images/news2.png',
          date: post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-ZA', {
                month: 'long',
                year: 'numeric',
              })
            : '',
          title: post.title,
          description: post.content.substring(0, 150) + '...',
          href: '/news',
          external: false,
        }))
      : staticNews

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section
          className="relative text-white py-24 min-h-[70vh] flex items-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #16a085 100%)' }}
          role="banner"
        >
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Excellence in Special Needs Education
                </h1>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  For 50 years, Thiboloha Special School has been empowering learners with
                  disabilities, achieving 100% pass rates and creating pathways to success.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/programs"
                    className="bg-[#f39c12] text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-500 transition-colors"
                  >
                    Our Programs
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#1e3a8a] transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/hero-image.jpg"
                  alt="Students learning at Thiboloha Special School"
                  className="rounded-2xl shadow-2xl w-full object-cover max-h-[420px]"
                  suppressHydrationWarning
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#f8f9fa] py-20" id="stats">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-1 transition-transform"
                >
                  <div className="text-4xl font-bold text-[#1e3a8a] mb-2">{s.value}</div>
                  <div className="text-[#2c3e50] font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-24" id="programs">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4">Our Specialized Programs</h2>
              <p className="text-[#6c757d] text-lg max-w-2xl mx-auto">
                We provide comprehensive education and support for learners with diverse learning
                needs, from early childhood through Grade 12 and FET programs.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((p) => (
                <div
                  key={p.href}
                  className="bg-white rounded-2xl shadow p-8 text-center hover:-translate-y-1 transition-transform flex flex-col"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
                    style={{ background: p.color }}
                  >
                    {p.icon}
                  </div>
                  <h5 className="font-semibold text-[#1e3a8a] mb-3">{p.title}</h5>
                  <p className="text-[#6c757d] text-sm flex-1">{p.description}</p>
                  <Link
                    href={p.href}
                    className="mt-4 inline-block border-2 border-[#1e3a8a] text-[#1e3a8a] font-semibold px-5 py-2 rounded-full hover:bg-[#1e3a8a] hover:text-white transition-colors text-sm"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-[#1e3a8a] text-white py-24" id="achievements">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-4">Our Achievements</h2>
              <p className="text-white/80 text-lg">
                Recognized for excellence in special needs education and outstanding learner
                outcomes.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((a, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 bg-[#f39c12] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    {a.icon}
                  </div>
                  <h5 className="font-semibold text-lg mb-3">{a.title}</h5>
                  <p className="text-white/80">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News */}
        <section className="bg-[#f8f9fa] py-24" id="news">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4">Latest News & Updates</h2>
              <p className="text-[#6c757d] text-lg">
                Stay informed about our latest achievements, events, and important announcements.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {newsItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow hover:-translate-y-1 transition-transform"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    suppressHydrationWarning
                  />
                  <div className="p-6">
                    <div className="text-[#16a085] font-semibold text-sm mb-2">{item.date}</div>
                    <h5 className="font-semibold text-[#1e3a8a] mb-3">{item.title}</h5>
                    <p className="text-[#6c757d] text-sm mb-4">{item.description}</p>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-[#1e3a8a] text-[#1e3a8a] font-semibold px-4 py-2 rounded-full hover:bg-[#1e3a8a] hover:text-white transition-colors text-sm"
                      >
                        Read More
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="border-2 border-[#1e3a8a] text-[#1e3a8a] font-semibold px-4 py-2 rounded-full hover:bg-[#1e3a8a] hover:text-white transition-colors text-sm"
                      >
                        Read More
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/news"
                className="bg-[#1e3a8a] text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-900 transition-colors"
              >
                View All News
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
