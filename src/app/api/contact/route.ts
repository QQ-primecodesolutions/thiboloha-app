import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const schema = z.object({
  program: z.enum(['deaf', 'blind', 'autistic', 'intellectual', 'general']),
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  const usingTurso = !!(process.env['TURSO_DATABASE_URL'] && process.env['TURSO_AUTH_TOKEN'])
  console.log('[contact] DB backend:', usingTurso ? 'turso' : 'local-sqlite')

  try {
    const body = await request.json()
    const data = schema.parse(body)

    const submission = await db.contactSubmission.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        program: data.program,
        message: data.message,
        status: 'pending',
      },
    })

    console.log('[contact] Created submission id:', submission.id)
    return NextResponse.json({ success: true, id: submission.id }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.issues }, { status: 400 })
    }
    console.error('[contact] DB error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
