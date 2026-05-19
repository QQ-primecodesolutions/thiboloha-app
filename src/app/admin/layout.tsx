import Link from 'next/link'
import { getSession } from '@/lib/auth'

async function handleLogout() {
  'use server'
  const { destroySession } = await import('@/lib/auth')
  const { redirect } = await import('next/navigation')
  await destroySession()
  redirect('/admin/login')
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await getSession()

  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex bg-[#f8f9fa]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="block">
            <img src="/images/logo.png" alt="Thiboloha" className="h-12 w-auto" suppressHydrationWarning />
          </Link>
          <p className="text-white/60 text-xs mt-2">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: 'Dashboard', href: '/admin/dashboard' },
            { label: 'Contact Submissions', href: '/admin/contact' },
            { label: 'News Posts', href: '/admin/news' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <form action={handleLogout}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
