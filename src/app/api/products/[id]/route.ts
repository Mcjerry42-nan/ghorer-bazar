import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: { category: true },
        })
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
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
        console.error('API Error (Product PUT):', error)
        return NextResponse.json({
            error: 'Failed to update product',
            details: error.message
        }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.product.delete({
            where: { id: parseInt(id) },
        })
        return NextResponse.json({ message: 'Product deleted' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
    }
}
