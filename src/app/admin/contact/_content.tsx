'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface Submission {
  id: string
  name: string
  phone: string
  email: string | null
  program: string
  message: string
  status: string
  createdAt: string
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  read: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
}

export default function AdminContactContent() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filter, setFilter] = useState({ program: '', status: '' })
  const [selected, setSelected] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    const params = new URLSearchParams()
    if (filter.program) params.set('program', filter.program)
    if (filter.status) params.set('status', filter.status)
    const res = await fetch(`/api/admin/contact?${params}`)
    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Failed to load submissions')
      setSubmissions([])
    } else {
      setSubmissions(Array.isArray(data) ? data : [])
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [filter])

  async function updateStatus(id: string, status: string) {
    const res = await fetch('/api/admin/contact', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) {
      toast.success(`Marked as ${status}`)
      setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status } : s))
      if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#1e3a8a] mb-6">Contact Submissions</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={filter.program}
          onChange={(e) => setFilter((f) => ({ ...f, program: e.target.value }))}
        >
          <option value="">All Programs</option>
          {['deaf', 'blind', 'autistic', 'intellectual', 'general'].map((p) => (
            <option key={p} value={p} className="capitalize">{p}</option>
          ))}
        </select>
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={filter.status}
          onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}
        >
          <option value="">All Statuses</option>
          {['pending', 'read', 'replied'].map((s) => (
            <option key={s} value={s} className="capitalize">{s}</option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-[#6c757d]">Loading…</div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : submissions.length === 0 ? (
            <div className="p-8 text-center text-[#6c757d]">No submissions found.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#f8f9fa]">
                <tr className="text-left text-[#6c757d]">
                  <th className="p-3">Name</th>
                  <th className="p-3">Program</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => { setSelected(s); updateStatus(s.id, s.status === 'pending' ? 'read' : s.status) }}
                    className={`border-b cursor-pointer hover:bg-blue-50 transition-colors ${selected?.id === s.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="p-3 font-medium">{s.name}</td>
                    <td className="p-3 capitalize">{s.program}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[s.status] ?? ''}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-3 text-[#6c757d]">
                      {new Date(s.createdAt).toLocaleDateString('en-ZA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail */}
        <div className="bg-white rounded-xl shadow p-6">
          {selected ? (
            <>
              <h2 className="font-bold text-[#1e3a8a] mb-4">{selected.name}</h2>
              <dl className="text-sm space-y-2">
                <div><dt className="text-[#6c757d]">Phone</dt><dd className="font-medium">{selected.phone}</dd></div>
                {selected.email && <div><dt className="text-[#6c757d]">Email</dt><dd className="font-medium">{selected.email}</dd></div>}
                <div><dt className="text-[#6c757d]">Program</dt><dd className="capitalize font-medium">{selected.program}</dd></div>
                <div><dt className="text-[#6c757d]">Date</dt><dd>{new Date(selected.createdAt).toLocaleString('en-ZA')}</dd></div>
              </dl>
              <hr className="my-4" />
              <p className="text-sm text-[#2c3e50] whitespace-pre-wrap">{selected.message}</p>
              <hr className="my-4" />
              {selected.email && (
                <div className="mb-4">
                  <p className="text-xs text-[#6c757d] mb-2 font-medium uppercase tracking-wide">Reply via</p>
                  <div className="flex gap-2 flex-wrap">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selected.email)}&su=${encodeURIComponent(`Re: Your enquiry to Thiboloha Special School`)}&body=${encodeURIComponent(`Dear ${selected.name},\n\nThank you for contacting Thiboloha Special School.\n\n`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#ea4335] text-white hover:bg-[#c5382a] transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                      </svg>
                      Gmail
                    </a>
                    <a
                      href={`https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(selected.email)}&subject=${encodeURIComponent(`Re: Your enquiry to Thiboloha Special School`)}&body=${encodeURIComponent(`Dear ${selected.name},\n\nThank you for contacting Thiboloha Special School.\n\n`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0078d4] text-white hover:bg-[#006cbf] transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 7.387v10.478L19.2 21V9.196l-7.2-2.4L4.8 9.196V21L0 17.865V7.387L12 3.6z"/>
                      </svg>
                      Outlook
                    </a>
                  </div>
                </div>
              )}
              <div className="flex gap-2 flex-wrap">
                {['pending', 'read', 'replied'].map((st) => (
                  <button
                    key={st}
                    onClick={() => updateStatus(selected.id, st)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      selected.status === st ? STATUS_COLORS[st] + ' border-transparent' : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-[#6c757d] text-sm">Select a submission to view details.</p>
          )}
        </div>
      </div>
    </div>
  )
}
