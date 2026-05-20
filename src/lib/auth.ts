import { cookies } from 'next/headers'

const SESSION_COOKIE = 'thiboloha_session'
const SESSION_VALUE = 'authenticated'

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const validUsername = process.env['ADMIN_USERNAME']
  const validPassword = process.env['ADMIN_PASSWORD']

  if (!validUsername || !validPassword) return false

  return username === validUsername && password === validPassword
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10,
    path: '/',
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE
}
