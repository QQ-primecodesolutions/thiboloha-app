import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { NewsCards } from '@/components/news-cards'
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
              <NewsCards posts={posts.map((p) => ({
                id: p.id,
                title: p.title,
                content: p.content,
                imageUrl: 'imageUrl' in p ? (p as { imageUrl?: string | null }).imageUrl : null,
                publishedAt: p.publishedAt ?? null,
              }))} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
