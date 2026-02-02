'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products')
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleDelete = async (id: number) => {
        if (!confirm('আপনি কি নিশ্চিতভাবে এই পণ্যটি ডিলিট করতে চান?')) return

        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id))
            } else {
                alert('ডিলিট করতে সমস্যা হয়েছে।')
            }
        } catch (error) {
            alert('একটি এরর হয়েছে।')
        }
    }

    if (loading) return <div className="p-8 text-center">লোড হচ্ছে...</div>

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">পণ্য ব্যবস্থাপনা</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition shadow-lg hover:shadow-primary/20"
                >
                    নতুন পণ্য যোগ করুন
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="py-5 px-6 font-bold text-gray-700">ছবি</th>
                            <th className="py-5 px-6 font-bold text-gray-700">নাম</th>
                            <th className="py-5 px-6 font-bold text-gray-700">ক্যাটাগরি</th>
                            <th className="py-5 px-6 font-bold text-gray-700">মূল্য</th>
                            <th className="py-5 px-6 font-bold text-gray-700">স্টক</th>
                            <th className="py-5 px-6 font-bold text-gray-700 text-center">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any) => {
                            let imageUrl = 'https://placehold.co/100x100?text=Product'
                            try {
                                const parsed = JSON.parse(product.images)
                                if (parsed.length > 0) imageUrl = parsed[0]
                            } catch (e) { }

                            return (
                                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                                            <img
                                                src={imageUrl}
                                                alt={product.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-gray-800">{product.title}</td>
                                    <td className="py-4 px-6 text-gray-600">
                                        <span className="bg-green-50 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                            {product.category.name}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 font-bold text-gray-900">৳{product.price}</td>
                                    <td className="py-4 px-6 text-gray-600">{product.stock}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                এডিট
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                ডিলিট
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        কোনো পণ্য খুঁজে পাওয়া যায়নি।
                    </div>
                )}
            </div>
        </div>
    )
}
