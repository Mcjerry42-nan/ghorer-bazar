import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { items, total, shippingAddress, userId, contactName, contactMobile, deliveryCharge, paymentMethod } = body

        const order = await prisma.order.create({
            data: {
                userId,
                total,
                customerName: contactName,
                customerMobile: contactMobile,
                shippingAddress: shippingAddress,
                status: 'PENDING',
                items: {
                    create: items.map((item: any) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
        })

        return NextResponse.json(order)
    } catch (error) {
        console.error('Order creation error:', error)
        return NextResponse.json({ error: 'Order creation failed' }, { status: 500 })
    }
}
