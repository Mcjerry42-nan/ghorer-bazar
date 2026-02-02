'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewCategoryPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        image: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                router.push('/admin/categories')
                setTimeout(() => router.refresh(), 200)
            } else {
                const errorData = await res.json()
                alert(`ক্যাটাগরি তৈরি করতে সমস্যা হয়েছে: ${errorData.details || errorData.error || 'অজানা এরর'}`)
            }
        } catch (error) {
            alert('একটি এরর হয়েছে। দয়া করে ইন্টারনেট কানেকশন চেক করুন।')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">নতুন ক্যাটাগরি তৈরি করুন</h1>
                <Link href="/admin/categories" className="text-gray-500 hover:text-gray-700">ফিরে যান</Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ক্যাটাগরির নাম *</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                            placeholder="মধু ও কালিজিরা"
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
                            placeholder="honey-and-black-seed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ছবির ইউআরএল (Image URL) *</label>
                        <input
                            type="url"
                            required
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-10 py-3 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'তৈরি হচ্ছে...' : 'ক্যাটাগরি তৈরি করুন'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
