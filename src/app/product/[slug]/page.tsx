import { prisma } from '@/lib/db'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import AddToCartButton from './AddToCartButton'

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const product = await prisma.product.findUnique({
        where: { slug: slug },
        include: { category: true },
    })

    if (!product) {
        notFound()
    }

    let productImages = ['https://placehold.co/800x800?text=No+Product+Image']
    try {
        const parsed = JSON.parse(product.images)
        if (Array.isArray(parsed) && parsed.length > 0) {
            productImages = parsed
        }
    } catch (e) {
        console.error('Error parsing product images:', e)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="relative h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                        src={productImages[0]}
                        alt={product.title}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>

                {/* Details */}
                <div>
                    <div className="text-sm text-gray-500 mb-2">
                        {product.category.name}
                    </div>

                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                    <div className="text-4xl font-bold text-primary mb-6">
                        ৳{product.price}
                    </div>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    <div className="mb-6">
                        <span
                            className={`inline-block px-3 py-1 rounded-md text-sm ${product.stock > 0
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}
                        >
                            {product.stock > 0 ? `স্টকে আছে (${product.stock})` : 'স্টক শেষ'}
                        </span>
                    </div>

                    <AddToCartButton
                        product={{
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            image: productImages[0]
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
