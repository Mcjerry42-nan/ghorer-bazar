'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditCategoryPage() {
    const router = useRouter()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        image: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/categories/${id}`)
                const data = await res.json()

                if (!data || data.error) {
                    alert('ক্যাটাগরি পাওয়া যায়নি।')
                    router.push('/admin/categories')
                    return
                }

                setFormData({
                    name: data.name,
                    slug: data.slug,
                    image: data.image || '',
                })
            } catch (error) {
                console.error('Failed to fetch category:', error)
                alert('ডাটা লোড করতে সমস্যা হয়েছে।')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                router.push('/admin/categories')
                router.refresh()
            } else {
                alert('ক্যাটাগরি আপডেট করতে সমস্যা হয়েছে।')
            }
        } catch (error) {
            alert('একটি এরর হয়েছে।')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8 text-center">লোড হচ্ছে...</div>

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">ক্যাটাগরি এডিট করুন</h1>
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
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ছবির ইউআরএল (Image URL)</label>
                        <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                        />
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
