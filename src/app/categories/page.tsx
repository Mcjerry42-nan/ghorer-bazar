import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany()

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-12 text-center">সকল ক্যাটাগরি</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {categories.map((category: any) => (
                    <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="group block"
                    >
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                            <div className="relative h-48 bg-gray-100">
                                <img
                                    src={category.image || 'https://placehold.co/400x400?text=Category'}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                                    {category.name}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
