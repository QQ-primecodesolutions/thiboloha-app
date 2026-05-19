import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const url = process.env['TURSO_DATABASE_URL']
  const authToken = process.env['TURSO_AUTH_TOKEN']

  if (url && authToken) {
    const { PrismaLibSQL } = require('@prisma/adapter-libsql')
    const adapter = new PrismaLibSQL({ url, authToken })
    return new PrismaClient({ adapter } as any)
  }

  return new PrismaClient()
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
