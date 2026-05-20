'use client'

import { useState, useEffect, useCallback } from 'react'

interface Post {
  id: string
  title: string
  content: string
  imageUrl?: string | null
  publishedAt: string | Date | null
}

function formatDate(value: string | Date | null) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function NewsCards({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<Post | null>(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close])

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => setActive(post)}
            className="bg-white rounded-2xl shadow overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer"
          >
            {post.imageUrl ? (
              <div className="h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="h-2 bg-[#1e3a8a]" />
            )}
            <div className="p-6">
              <div className="text-[#16a085] font-semibold text-sm mb-2">
                {formatDate(post.publishedAt)}
              </div>
              <h2 className="font-bold text-[#1e3a8a] text-lg mb-3">{post.title}</h2>
              <p className="text-[#6c757d] text-sm leading-relaxed">
                {post.content.length > 200 ? post.content.substring(0, 200) + '…' : post.content}
              </p>
              <span className="inline-block mt-4 text-[#1e3a8a] text-sm font-semibold underline underline-offset-2">
                Read more
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={close}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {active.imageUrl && (
              <div className="h-44 sm:h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={active.imageUrl}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="text-[#16a085] font-semibold text-sm mb-1">
                    {formatDate(active.publishedAt)}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1e3a8a]">{active.title}</h2>
                </div>
                <button
                  onClick={close}
                  aria-label="Close"
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                  ✕
                </button>
              </div>
              <hr className="mb-6" />
              <p className="text-[#2c3e50] leading-relaxed whitespace-pre-wrap">{active.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
