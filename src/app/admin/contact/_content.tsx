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
    <div className="p-4 sm:p-8">
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
        {/* List — hidden on mobile when a submission is selected */}
        <div className={`lg:col-span-2 bg-white rounded-xl shadow overflow-hidden ${selected ? 'hidden lg:block' : ''}`}>
          {loading ? (
            <div className="p-8 text-center text-[#6c757d]">Loading…</div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : submissions.length === 0 ? (
            <div className="p-8 text-center text-[#6c757d]">No submissions found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#f8f9fa]">
                  <tr className="text-left text-[#6c757d]">
                    <th className="p-3">Name</th>
                    <th className="p-3">Program</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 hidden sm:table-cell">Date</th>
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
                      <td className="p-3 text-[#6c757d] hidden sm:table-cell">
                        {new Date(s.createdAt).toLocaleDateString('en-ZA')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail — hidden on mobile when nothing is selected */}
        <div className={`bg-white rounded-xl shadow p-6 ${!selected ? 'hidden lg:block' : ''}`}>
          {selected ? (
            <>
              {/* Back button — mobile only */}
              <button
                className="lg:hidden mb-4 flex items-center gap-1 text-sm text-[#1e3a8a] font-medium"
                onClick={() => setSelected(null)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to list
              </button>

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
              <div className="mb-4">
                <p className="text-xs text-[#6c757d] mb-2 font-medium uppercase tracking-wide">Reply via</p>
                <div className="flex gap-2 flex-wrap">
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, '').replace(/^0/, '27')}?text=${encodeURIComponent(`Dear ${selected.name},\n\nThank you for contacting Thiboloha Special School.\n\n`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#25d366] text-white hover:bg-[#1ebe5d] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                  {selected.email && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
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
