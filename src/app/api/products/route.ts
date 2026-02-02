import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: { category: true },
            orderBy: { id: 'desc' },
        })
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log('Creating Product with body:', body)

        const product = await prisma.product.create({
            data: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                price: parseFloat(body.price.toString()),
                stock: parseInt(body.stock.toString()) || 0,
                categoryId: parseInt(body.categoryId.toString()),
                images: body.images,
            },
        })
        return NextResponse.json(product)
    } catch (error: any) {
        console.error('API Error (Product POST):', error)
        return NextResponse.json({
            error: 'Failed to create product',
            details: error.message
        }, { status: 500 })
    }
}
