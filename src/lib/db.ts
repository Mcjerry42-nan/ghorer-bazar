import { PrismaClient } from '../generated/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const isClientValid = (client: any) => client && client.message;

export const prisma =
    (globalForPrisma.prisma && isClientValid(globalForPrisma.prisma)) ?
        globalForPrisma.prisma :
        new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

