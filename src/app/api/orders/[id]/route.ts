import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: true,
                items: {
                    include: {
                        product: true
                    }
                }
            },
        })

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }

        return NextResponse.json(order)
    } catch (error) {
        console.error('Fetch order error:', error)
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params
        const id = resolvedParams.id
        const body = await req.json()
        const { status } = body

        console.log(`Updating Order ${id} to status: ${status}`)

        if (!id) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
        }

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status },
            include: {
                user: true,
                items: {
                    include: {
                        product: true
                    }
                }
            },
        })

        return NextResponse.json(order)
    } catch (error: any) {
        console.error('Update order error details:', error)
        return NextResponse.json({
            error: 'Failed to update order',
            details: error.message,
            code: error.code // Prisma error code if available
        }, { status: 500 })
    }
}
