'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditProductPage() {
    const router = useRouter()
    const { id } = useParams()
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        price: '',
        stock: '',
        categoryId: '',
        imageUrl: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    fetch('/api/categories'),
                    fetch(`/api/products/${id}`)
                ])
                const catData = await catRes.json()
                const prodData = await prodRes.json()

                if (!prodData || prodData.error || !prodData.title) {
                    alert('পণ্যটি পাওয়া যায়নি।')
                    router.push('/admin/products')
                    return
                }

                setCategories(catData)
                let imageUrl = ''
                try {
                    const parsed = JSON.parse(prodData.images)
                    imageUrl = Array.isArray(parsed) ? parsed[0] : ''
                } catch (e) { }

                setFormData({
                    title: prodData.title || '',
                    slug: prodData.slug || '',
                    description: prodData.description || '',
                    price: (prodData.price ?? '').toString(),
                    stock: (prodData.stock ?? '0').toString(),
                    categoryId: (prodData.categoryId ?? '').toString(),
                    imageUrl: imageUrl,
                })
            } catch (error) {
                console.error('Failed to fetch data:', error)
                alert('ডাটা লোড করতে সমস্যা হয়েছে।')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                    images: JSON.stringify([formData.imageUrl]),
                    categoryId: parseInt(formData.categoryId)
                }),
            })

            if (res.ok) {
                router.push('/admin/products')
                setTimeout(() => router.refresh(), 200)
            } else {
                const errorData = await res.json()
                alert(`পণ্য আপডেট করতে সমস্যা হয়েছে: ${errorData.details || errorData.error || 'অজানা এরর'}`)
            }
        } catch (error) {
            alert('একটি এরর হয়েছে। দয়া করে ইন্টারনেট কানেকশন চেক করুন।')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8 text-center">লোড হচ্ছে...</div>

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">পণ্য এডিট করুন</h1>
                <Link href="/admin/products" className="text-gray-500 hover:text-gray-700">ফিরে যান</Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">পণ্যের নাম *</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">স্লাগ (Slug) *</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">বর্ণনা (Description) *</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">মূল্য (Price) *</label>
                            <input
                                type="number"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">স্টক (Stock) *</label>
                            <input
                                type="number"
                                required
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">ক্যাটাগরি *</label>
                            <select
                                required
                                value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition appearance-none"
                            >
                                <option value="">নির্বাচন করুন</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">ছবির ইউআরএল (Image URL) *</label>
                            <input
                                type="url"
                                required
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className={`px-10 py-3 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition active:scale-95 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {saving ? 'আপডেট হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
