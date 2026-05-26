import { getSession } from '@/lib/auth'
import AdminNav from './_nav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await getSession()

  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex bg-[#f8f9fa]">
      <AdminNav />
      {/* pt-14 offsets the fixed mobile top bar; removed on md+ */}
      <main className="flex-1 overflow-auto min-w-0 pt-14 md:pt-0">
        {children}
      </main>
    </div>
  )
}
