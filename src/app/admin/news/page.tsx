import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminNewsContent from './_content'

export default async function AdminNewsPage() {
  if (!(await getSession())) redirect('/admin/login')
  return <AdminNewsContent />
}
