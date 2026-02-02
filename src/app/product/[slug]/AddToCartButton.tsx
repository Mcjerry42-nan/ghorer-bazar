'use client'

import React from 'react'
import { useCart } from '@/context/cart-context'

interface AddToCartButtonProps {
    product: {
        id: number
        title: string
        price: number
        image: string
    }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart, toggleFavorite, favorites } = useCart()
    const isFavorite = favorites.includes(product.id)

    return (
        <div className="flex gap-4">
            <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95"
            >
                কার্টে যোগ করুন
            </button>
            <button
                onClick={() => toggleFavorite(product.id)}
                className={`px-6 py-4 rounded-xl font-semibold transition-all shadow-md active:scale-95 ${isFavorite
                        ? 'bg-red-500 text-white shadow-red-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
            >
                {isFavorite ? '♥' : '♡'}
            </button>
        </div>
    )
}
