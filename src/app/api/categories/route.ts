import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
        })
        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const category = await prisma.category.create({
            data: {
                name: body.name,
                slug: body.slug,
                image: body.image,
            },
        })
        return NextResponse.json(category)
    } catch (error: any) {
        console.error('API Error (Category POST):', error)
        return NextResponse.json({
            error: 'Failed to create category',
            details: error.message
        }, { status: 500 })
    }
}
