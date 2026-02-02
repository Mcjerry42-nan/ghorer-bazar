import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const sender = searchParams.get('sender')

    try {
        const messages = await prisma.chatMessage.findMany({
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

        const message = await prisma.chatMessage.create({
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
