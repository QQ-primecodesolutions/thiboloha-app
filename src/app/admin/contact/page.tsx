import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminContactContent from './_content'

export default async function AdminContactPage() {
  if (!(await getSession())) redirect('/admin/login')
  return <AdminContactContent />
}
