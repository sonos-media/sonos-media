import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// Vérification de DATABASE_URL en production
if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined in production!')
  throw new Error('DATABASE_URL environment variable is required')
}

if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('postgres://') && !process.env.DATABASE_URL.startsWith('postgresql://')) {
  console.error('❌ DATABASE_URL must start with postgres:// or postgresql://')
  console.error('Current DATABASE_URL:', process.env.DATABASE_URL ? '***' + process.env.DATABASE_URL.slice(-20) : 'undefined')
  throw new Error('Invalid DATABASE_URL format')
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma
