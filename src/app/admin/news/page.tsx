'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface NewsPost {
  id: string
  title: string
  slug: string
  content: string
  published: boolean
  publishedAt: string | null
  createdAt: string
}

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<NewsPost | null>(null)
  const [form, setForm] = useState({ title: '', slug: '', content: '', published: false })

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/news')
    setPosts(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditing(null)
    setForm({ title: '', slug: '', content: '', published: false })
    setShowForm(true)
  }

  function openEdit(post: NewsPost) {
    setEditing(post)
    setForm({ title: post.title, slug: post.slug, content: post.content, published: post.published })
    setShowForm(true)
  }

  async function save() {
    const method = editing ? 'PATCH' : 'POST'
    const body = editing ? { ...form, id: editing.id } : form
    const res = await fetch('/api/admin/news', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      toast.success(editing ? 'Post updated' : 'Post created')
      setShowForm(false)
      load()
    }
  }

  async function togglePublish(post: NewsPost) {
    const res = await fetch('/api/admin/news', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    })
    if (res.ok) {
      toast.success(post.published ? 'Unpublished' : 'Published')
      load()
    }
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this post?')) return
    const res = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Deleted'); load() }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1e3a8a]">News Posts</h1>
        <button
          onClick={openCreate}
          className="bg-[#1e3a8a] text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-900 transition-colors text-sm"
        >
          + New Post
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            <h2 className="font-bold text-[#1e3a8a] text-lg mb-4">{editing ? 'Edit Post' : 'New Post'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                  value={form.title}
                  onChange={(e) => {
                    const t = e.target.value
                    setForm((f) => ({
                      ...f,
                      title: t,
                      slug: f.slug || t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                    }))
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  rows={6}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a8a] outline-none resize-none"
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                />
                <label htmlFor="published" className="text-sm">Publish immediately</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={save} className="bg-[#1e3a8a] text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-900">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-[#6c757d]">Loading…</div>
      ) : posts.length === 0 ? (
        <div className="p-8 text-center text-[#6c757d]">No posts yet.</div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr className="text-left text-[#6c757d]">
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b last:border-0">
                  <td className="p-3 font-medium">{post.title}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-3 text-[#6c757d]">
                    {new Date(post.createdAt).toLocaleDateString('en-ZA')}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(post)} className="text-xs text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => togglePublish(post)} className="text-xs text-[#16a085] hover:underline">
                        {post.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => deletePost(post.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
