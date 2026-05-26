import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const program = searchParams.get('program')
  const status = searchParams.get('status')

  try {
    const submissions = await db.contactSubmission.findMany({
      where: {
        ...(program ? { program } : {}),
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(submissions)
  } catch (err) {
    console.error('Contact submissions DB error:', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { id, status } = body as { id: string; status: string }

  if (!id || !['pending', 'read', 'replied'].includes(status)) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const updated = await db.contactSubmission.update({
    where: { id },
    data: { status },
  })

  return NextResponse.json(updated)
}
