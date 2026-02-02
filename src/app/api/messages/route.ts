import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const sender = searchParams.get('sender')

    try {
        const client = prisma as any
        if (!client.message) {
            return NextResponse.json({
                error: 'Server configuration error',
                details: 'Database model "message" is not available.'
            }, { status: 500 })
        }
        const messages = await client.message.findMany({
            where: sender ? { sender } : {},
            orderBy: { createdAt: 'asc' },
        })
        return NextResponse.json(messages)
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch messages',
            details: error.message
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { content, sender, isAdmin } = body
        const client = prisma as any

        if (!client.message) {
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
        }

        const message = await client.message.create({
            data: {
                content,
                sender: sender || 'admin',
                isAdmin: !!isAdmin,
            },
        })

        return NextResponse.json(message)
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to send message', details: error.message }, { status: 500 })
    }
}
