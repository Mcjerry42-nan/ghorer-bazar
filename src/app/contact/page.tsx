'use client'

import React, { useState } from 'react'

export default function ContactPage() {
    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        subject: 'Contact Form Submission',
        message: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setStatus(null)

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                setStatus({ type: 'success', message: 'আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। ধন্যবাদ!' })
                setFormData({ name: '', email: '', mobile: '', subject: 'Contact Form Submission', message: '' })
            } else {
                const data = await res.json()
                setStatus({ type: 'error', message: `বার্তা পাঠাতে সমস্যা হয়েছে: ${data.details || data.error}` })
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'একটি নেটওয়ার্ক এরর হয়েছে। দয়া করে আবার চেষ্টা করুন।' })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">যোগাযোগ করুন</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6">আমাদের পাঠিয়ে দিন</h2>

                    {status && (
                        <div className={`p-4 rounded-xl mb-6 font-bold ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">নাম *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
                                placeholder="আপনার নাম"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">ইমেইল *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
                                    placeholder="test@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">মোবাইল নম্বর</label>
                                <input
                                    type="tel"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
                                    placeholder="০১৭১২-৩৪৫৬৭৮"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">বার্তা *</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
                                rows={5}
                                placeholder="আপনার বার্তা..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
                        </button>
                    </form>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 italic">
                        <h3 className="text-xl font-bold mb-4 not-italic">অফিস ঠিকানা</h3>
                        <p className="text-gray-600">ঢাকা, বাংলাদেশ। আমাদের অফিস পরিদর্শনে আপনাদের স্বাগতম।</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">ফোন নম্বর</h3>
                            <p className="text-gray-800 font-bold font-mono">+৮৮০ ১৭১২-৩৪৫৬৭৮</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">ইমেইল</h3>
                            <p className="text-gray-800 font-bold">info@ghorerbazar.com</p>
                        </div>
                    </div>
                    <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                        <h3 className="text-xl font-bold mb-4 text-primary">অফিস সময়</h3>
                        <div className="space-y-2 text-gray-700">
                            <p className="flex justify-between"><span>শনিবার - বৃহস্পতিবার:</span> <span className="font-bold">সকাল ৯টা - সন্ধ্যা ৭টা</span></p>
                            <p className="flex justify-between"><span>শুক্রবার:</span> <span className="font-bold text-red-500">বন্ধ</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
