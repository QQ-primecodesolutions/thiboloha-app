'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        toast.error('Invalid credentials')
        return
      }
      const from = searchParams.get('from') || '/admin/dashboard'
      router.push(from)
      router.refresh()
    } catch {
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1e3a8a] outline-none"
          suppressHydrationWarning
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1e3a8a] outline-none"
          suppressHydrationWarning
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1e3a8a] text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-60"
        suppressHydrationWarning
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="Thiboloha Special School" className="h-16 mx-auto mb-4" suppressHydrationWarning />
          <h1 className="text-2xl font-bold text-[#1e3a8a]">Admin Login</h1>
          <p className="text-[#6c757d] text-sm mt-1">Thiboloha Special School</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
