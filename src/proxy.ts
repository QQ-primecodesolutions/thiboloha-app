import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE = 'thiboloha_session'
const SESSION_VALUE = 'authenticated'
const SESSION_MAX_AGE = 60 * 10 // 10 minutes, rolling

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_MAX_AGE,
    path: '/',
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get(SESSION_COOKIE)?.value === SESSION_VALUE

  // Public pages — visiting any non-admin page clears the admin session.
  // This ensures you must log in again after leaving the admin area.
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
    if (isAuthenticated) {
      const res = NextResponse.next()
      res.cookies.delete(SESSION_COOKIE)
      return res
    }
    return NextResponse.next()
  }

  // Auth endpoint is always reachable — handles login and logout
  if (pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next()
  }

  // Protect all other /api/admin/* routes
  if (pathname.startsWith('/api/admin/')) {
    if (!isAuthenticated) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
    const res = NextResponse.next()
    res.cookies.set(SESSION_COOKIE, SESSION_VALUE, cookieOptions())
    return res
  }

  // Login page — already authenticated → skip to dashboard
  if (pathname === '/admin/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // /admin root — redirect based on auth state
  if (pathname === '/admin' || pathname === '/admin/') {
    return NextResponse.redirect(
      new URL(isAuthenticated ? '/admin/dashboard' : '/admin/login', request.url)
    )
  }

  // All other /admin/* pages — must be authenticated
  if (!isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Authenticated: refresh rolling session on every admin request
  const res = NextResponse.next()
  res.cookies.set(SESSION_COOKIE, SESSION_VALUE, cookieOptions())
  return res
}

export const config = {
  // Match everything except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|images/).*)'],
}
