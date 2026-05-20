import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || !authToken) {
  console.error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN')
  process.exit(1)
}

const db = createClient({ url, authToken })

const statements = [
  `CREATE TABLE IF NOT EXISTS "ContactSubmission" (
    "id"        TEXT     NOT NULL PRIMARY KEY,
    "name"      TEXT     NOT NULL,
    "phone"     TEXT     NOT NULL,
    "email"     TEXT,
    "program"   TEXT     NOT NULL,
    "message"   TEXT     NOT NULL,
    "status"    TEXT     NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "NewsPost" (
    "id"          TEXT     NOT NULL PRIMARY KEY,
    "title"       TEXT     NOT NULL,
    "slug"        TEXT     NOT NULL,
    "content"     TEXT     NOT NULL,
    "imageUrl"    TEXT,
    "published"   INTEGER  NOT NULL DEFAULT 0,
    "publishedAt" DATETIME,
    "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   DATETIME NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "NewsPost_slug_key" ON "NewsPost"("slug")`,
  `CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id"           TEXT     NOT NULL PRIMARY KEY,
    "username"     TEXT     NOT NULL,
    "passwordHash" TEXT     NOT NULL,
    "role"         TEXT     NOT NULL DEFAULT 'admin',
    "createdAt"    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    DATETIME NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_username_key" ON "AdminUser"("username")`,
]

for (const sql of statements) {
  await db.execute(sql)
  const name = sql.match(/"(\w+)"/)?.[1] ?? 'statement'
  console.log(`✓ ${name}`)
}

console.log('\nSchema pushed to Turso successfully.')
db.close()
