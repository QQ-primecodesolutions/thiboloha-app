import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

const createSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  published: z.boolean().default(false),
})

const updateSchema = createSchema.partial().extend({ id: z.string() })

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const posts = await db.newsPost.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const data = createSchema.parse(body)

  const post = await db.newsPost.create({
    data: {
      ...data,
      publishedAt: data.published ? new Date() : null,
    },
  })

  return NextResponse.json(post, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { id, ...rest } = updateSchema.parse(body)

  const post = await db.newsPost.update({
    where: { id },
    data: {
      ...rest,
      ...(rest.published !== undefined && rest.published
        ? { publishedAt: new Date() }
        : rest.published === false
        ? { publishedAt: null }
        : {}),
    },
  })

  return NextResponse.json(post)
}

export async function DELETE(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  await db.newsPost.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
