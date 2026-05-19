import { db } from '@/lib/db'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const [totalSubmissions, pendingSubmissions, totalNews, publishedNews] = await Promise.all([
    db.contactSubmission.count(),
    db.contactSubmission.count({ where: { status: 'pending' } }),
    db.newsPost.count(),
    db.newsPost.count({ where: { published: true } }),
  ])

  const recentSubmissions = await db.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#1e3a8a] mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Submissions', value: totalSubmissions, color: '#4a90e2' },
          { label: 'Pending', value: pendingSubmissions, color: '#e74c3c' },
          { label: 'News Posts', value: totalNews, color: '#16a085' },
          { label: 'Published', value: publishedNews, color: '#f39c12' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-6 shadow text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-[#6c757d] text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent submissions */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#1e3a8a]">Recent Submissions</h2>
          <Link href="/admin/contact" className="text-sm text-[#4a90e2] hover:underline">
            View all
          </Link>
        </div>
        {recentSubmissions.length === 0 ? (
          <p className="text-[#6c757d] text-sm">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6c757d] border-b">
                  <th className="pb-2 pr-4">Name</th>
                  <th className="pb-2 pr-4">Program</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((s) => (
                  <tr key={s.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{s.name}</td>
                    <td className="py-3 pr-4 capitalize">{s.program}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          s.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : s.status === 'read'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 text-[#6c757d]">
                      {new Date(s.createdAt).toLocaleDateString('en-ZA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
