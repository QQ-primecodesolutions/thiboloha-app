import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'News & Updates',
  description:
    'Latest news, achievements, and announcements from Thiboloha Special School.',
}

async function getPosts() {
  try {
    return await db.newsPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    })
  } catch {
    return []
  }
}

const staticNews = [
  {
    id: '1',
    title: 'Hollywood Foundation Back to School Support',
    slug: 'hollywood-foundation-back-to-school',
    content:
      'The Hollywood Foundation provided essential school supplies and shoes for our learners, supporting their educational journey. This incredible initiative helped ensure every learner started the term fully equipped.',
    publishedAt: '2024-03-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Exceptional 2024 NSC Results',
    slug: 'nsc-results-2024',
    content:
      'Our Grade 12 learners achieved another 100% pass rate with 75% Bachelor passes and 15% Diploma passes. This incredible achievement continues our proud tradition of academic excellence.',
    publishedAt: '2024-12-15T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'New Skills Development Programs',
    slug: 'new-skills-development-2025',
    content:
      'Expanding our technical skills offerings with new workshops in hospitality, agriculture, and entrepreneurship. These programs open new doors for our graduates in the local economy.',
    publishedAt: '2025-01-10T00:00:00.000Z',
  },
]

export default async function NewsPage() {
  const dbPosts = await getPosts()
  const posts = dbPosts.length > 0 ? dbPosts : staticNews

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section
          className="text-white py-16"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #16a085 100%)' }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-3">News & Updates</h1>
            <p className="text-white/85 text-lg">
              Stay informed about the latest happenings at Thiboloha Special School.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <p className="text-center text-[#6c757d]">No news posts yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl shadow overflow-hidden hover:-translate-y-1 transition-transform">
                    <div className="h-2 bg-[#1e3a8a]" />
                    <div className="p-6">
                      <div className="text-[#16a085] font-semibold text-sm mb-2">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('en-ZA', {
                              month: 'long',
                              year: 'numeric',
                              day: 'numeric',
                            })
                          : ''}
                      </div>
                      <h2 className="font-bold text-[#1e3a8a] text-lg mb-3">{post.title}</h2>
                      <p className="text-[#6c757d] text-sm leading-relaxed">
                        {post.content.length > 200
                          ? post.content.substring(0, 200) + '…'
                          : post.content}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
