'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import ProductCard from '@/components/ProductCard'
import { useState, useEffect } from 'react'

export default function FavoritesPage() {
    const { favorites } = useCart()
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            try {
                const res = await fetch('/api/products')
                const allProducts = await res.json()
                const favProducts = allProducts.filter((p: any) => favorites.includes(p.id))
                setProducts(favProducts)
            } catch (error) {
                console.error('Failed to fetch favorite products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchFavoriteProducts()
    }, [favorites])

    if (loading) return <div className="p-12 text-center text-xl font-bold">লোড হচ্ছে...</div>

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black mb-10 text-gray-900">আমার পছন্দের তালিকা ({products.length})</h1>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <div className="text-6xl mb-6">❤️</div>
                    <p className="text-gray-500 text-xl mb-8 font-medium">আপনার পছন্দের তালিকায় কোনো পণ্য নেই</p>
                    <Link
                        href="/products"
                        className="inline-block bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-secondary hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                    >
                        পণ্য দেখুন
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            )}
        </div>
    )
}
