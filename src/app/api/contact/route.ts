import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, subject, message, mobile } = body

        const newMessage = await prisma.message.create({
            data: {
                name,
                email,
                subject: subject || 'Contact Form Submission',
                message,
                mobile: mobile || null,
                status: 'UNREAD'
            },
        })

        return NextResponse.json(newMessage)
    } catch (error: any) {
        console.error('Contact API error:', error)
        return NextResponse.json({
            error: 'Failed to send message',
            details: error.message
        }, { status: 500 })
    }
}
