'use client'

import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'

interface NewsPost {
  id: string
  title: string
  slug: string
  content: string
  imageUrl: string | null
  published: boolean
  publishedAt: string | null
  createdAt: string
}

export default function AdminNewsContent() {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<NewsPost | null>(null)
  const [form, setForm] = useState({ title: '', slug: '', content: '', imageUrl: '', published: false })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/news')
    setPosts(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditing(null)
    setForm({ title: '', slug: '', content: '', imageUrl: '', published: false })
    setImagePreview(null)
    setShowForm(true)
  }

  function openEdit(post: NewsPost) {
    setEditing(post)
    setForm({ title: post.title, slug: post.slug, content: post.content, imageUrl: post.imageUrl ?? '', published: post.published })
    setImagePreview(post.imageUrl ?? null)
    setShowForm(true)
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)

    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      setForm((f) => ({ ...f, imageUrl: url }))
      setImagePreview(url)
    } else {
      const { error } = await res.json()
      toast.error(error ?? 'Upload failed')
    }
    setUploading(false)
  }

  function removeImage() {
    setForm((f) => ({ ...f, imageUrl: '' }))
    setImagePreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function save() {
    const method = editing ? 'PATCH' : 'POST'
    const body = editing
      ? { ...form, id: editing.id, imageUrl: form.imageUrl || null }
      : { ...form, imageUrl: form.imageUrl || undefined }
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
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
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
                      slug: editing ? f.slug : t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
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

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Cover Image</label>
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Cover preview"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1e3a8a] hover:bg-blue-50 transition-colors">
                    {uploading ? (
                      <span className="text-sm text-[#6c757d]">Uploading…</span>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-[#6c757d]">Click to upload image</span>
                        <span className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP, GIF — max 5 MB</span>
                      </>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={uploading}
                    />
                  </label>
                )}
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
                <th className="p-3 w-16">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b last:border-0">
                  <td className="p-3">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt="" className="w-12 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                        </svg>
                      </div>
                    )}
                  </td>
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
