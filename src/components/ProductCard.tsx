'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'

interface ProductCardProps {
    id: number
    title: string
    price: number
    discountPrice?: number | null
    images: string
    slug: string
}

export default function ProductCard({
    id,
    title,
    price,
    discountPrice,
    images,
    slug,
}: ProductCardProps) {
    const { addToCart, toggleFavorite, favorites } = useCart()
    const isFavorite = favorites.includes(id)
    const router = useRouter()

    let imageUrl = 'https://placehold.co/600x400?text=No+Image'
    try {
        const parsedImages = JSON.parse(images)
        if (Array.isArray(parsedImages) && parsedImages.length > 0) {
            imageUrl = parsedImages[0]
        }
    } catch (e) {
        // Fallback already set
    }

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(id)
        router.push('/favorites')
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart({
            id,
            title,
            price: discountPrice || price,
            image: imageUrl,
            quantity: 1,
        })
    }

    const finalPrice = discountPrice || price

    return (
        <div className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
            <Link href={`/product/${slug}`} className="relative h-64 overflow-hidden block">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {discountPrice && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                        -{Math.round(((price - discountPrice) / price) * 100)}% ছাড়
                    </div>
                )}
                <button
                    onClick={handleFavorite}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white/90 backdrop-blur-sm shadow-md hover:scale-110 active:scale-95 ${isFavorite ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500'
                        }`}
                >
                    <span className="text-xl">{isFavorite ? '❤️' : '♡'}</span>
                </button>
            </Link>

            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <Link href={`/product/${slug}`}>
                        <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                            {title}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-black text-primary">
                            ৳{finalPrice}
                        </span>
                        {discountPrice && (
                            <span className="text-gray-400 line-through text-sm">৳{price}</span>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary hover:shadow-xl hover:scale-[1.03] transition-all active:scale-95 shadow-lg shadow-primary/10"
                >
                    <span className="text-xl">+</span> কার্টে যোগ করুন
                </button>
            </div>
        </div>
    )
}
