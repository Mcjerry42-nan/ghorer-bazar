'use client'

import React from 'react'
import Link from 'next/link'

interface CategoryItem {
    id: number
    name: string
    slug: string
    image: string | null
    _count: {
        products: number
    }
}

interface CategoryListProps {
    categories: CategoryItem[]
}

export default function CategoryList({ categories }: CategoryListProps) {
    const handleDelete = async (id: number) => {
        if (confirm('আপনি কি নিশ্চিতভাবে এই ক্যাটাগরি ডিলিট করতে চান?')) {
            try {
                const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
                if (res.ok) {
                    window.location.reload()
                } else {
                    alert('ক্যাটাগরি ডিলিট করা সম্ভব হয়নি।')
                }
            } catch (error) {
                alert('একটি এরর হয়েছে।')
            }
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="py-5 px-6 font-bold text-gray-700">ছবি</th>
                        <th className="py-5 px-6 font-bold text-gray-700">নাম</th>
                        <th className="py-5 px-6 font-bold text-gray-700">স্লাগ (Slug)</th>
                        <th className="py-5 px-6 font-bold text-gray-700">পণ্য সংখ্যা</th>
                        <th className="py-5 px-6 font-bold text-gray-700 text-center">অ্যাকশন</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-6">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                                    <img
                                        src={category.image || 'https://placehold.co/100x100?text=Category'}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </td>
                            <td className="py-4 px-6 font-semibold text-gray-800">{category.name}</td>
                            <td className="py-4 px-6 text-gray-500 font-mono text-xs">{category.slug}</td>
                            <td className="py-4 px-6 text-gray-600">
                                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                    {category._count.products}টি পণ্য
                                </span>
                            </td>
                            <td className="py-4 px-6">
                                <div className="flex justify-center gap-3">
                                    <Link
                                        href={`/admin/categories/${category.id}/edit`}
                                        className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        এডিট
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        ডিলিট
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {categories.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                    কোনো ক্যাটাগরি তৈরি করা হয়নি।
                </div>
            )}
        </div>
    )
}
