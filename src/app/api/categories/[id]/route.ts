import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
        })
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 })
        }
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()
        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                name: body.name,
                slug: body.slug,
                image: body.image,
            },
        })
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.category.delete({
            where: { id: parseInt(id) },
        })
        return NextResponse.json({ message: 'Category deleted' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
    }
}
