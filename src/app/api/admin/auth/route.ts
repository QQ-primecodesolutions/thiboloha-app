import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, createSession, destroySession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  const valid = await verifyCredentials(username, password)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  await createSession()
  return NextResponse.json({ success: true })
}

export async function DELETE() {
  await destroySession()
  return NextResponse.json({ success: true })
}
