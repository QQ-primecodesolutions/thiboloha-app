import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE = 'thiboloha_session'
const SESSION_VALUE = 'authenticated'

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const validUsername = process.env['ADMIN_USERNAME']
  const passwordHash = process.env['ADMIN_PASSWORD_HASH']

  if (!validUsername || !passwordHash) return false
  if (username !== validUsername) return false

  return bcrypt.compare(password, passwordHash)
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
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
