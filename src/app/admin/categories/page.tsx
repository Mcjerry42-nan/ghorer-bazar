import { prisma } from '@/lib/db'
import Link from 'next/link'
import CategoryList from '@/components/admin/CategoryList'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminCategoriesPage() {
    const categories = await prisma.category.findMany({
        include: { _count: { select: { products: true } } },
        orderBy: { name: 'asc' },
    })

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">ক্যাটাগরি ব্যবস্থাপনা</h1>
                <Link
                    href="/admin/categories/new"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                >
                    নতুন ক্যাটাগরি তৈরি করুন
                </Link>
            </div>

            <CategoryList categories={categories as any} />
        </div>
    )
}

