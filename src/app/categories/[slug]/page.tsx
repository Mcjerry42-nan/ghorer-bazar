import { prisma } from '@/lib/db'
import ProductCard from '@/components/ProductCard'
import { notFound } from 'next/navigation'

export default async function CategoryDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const category = await prisma.category.findUnique({
        where: { slug: slug },
        include: { products: true },
    })

    if (!category) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold">{category.name}</h1>
                <span className="text-gray-500">({category.products.length}টি পণ্য)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.products.map((product: any) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

            {category.products.length === 0 && (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500 text-lg">এই ক্যাটাগরিতে কোনো পণ্য খুঁজে পাওয়া যায়নি।</p>
                </div>
            )}
        </div>
    )
}
