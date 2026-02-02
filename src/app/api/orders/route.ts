import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { items, total, shippingAddress, userId, contactName, contactMobile, deliveryCharge, paymentMethod } = body

        const order = await prisma.order.create({
            data: {
                userId: userId ? parseInt(userId.toString()) : null,
                total: parseFloat(total.toString()),
                customerName: contactName,
                customerMobile: contactMobile,
                shippingAddress: shippingAddress,
                status: 'PENDING',
                items: {
                    create: items.map((item: any) => ({
                        productId: parseInt(item.id.toString()),
                        quantity: parseInt(item.quantity.toString()),
                        price: parseFloat(item.price.toString()),
                    })),
                },
            },
        })

        return NextResponse.json(order)
    } catch (error: any) {
        console.error('CRITICAL: Order creation failed!', error)
        return NextResponse.json({
            error: 'Order creation failed',
            details: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
