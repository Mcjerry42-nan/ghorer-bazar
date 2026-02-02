'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminLoginPage() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Placeholder: In real app, verify credentials
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            window.location.href = '/admin/dashboard'
        } else {
            alert('ভুল ইউজারনেম বা পাসওয়ার্ড')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">অ্যাডমিন লগইন</h1>
                    <p className="text-gray-500 mt-2">আপনার অ্যাডমিন প্যানেলে প্রবেশ করুন</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">ইউজারনেম</label>
                        <input
                            type="text"
                            required
                            value={credentials.username}
                            onChange={(e) =>
                                setCredentials({ ...credentials, username: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="admin"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">পাসওয়ার্ড</label>
                        <input
                            type="password"
                            required
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
                    >
                        লগইন করুন
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>ডেমো: admin / admin123</p>
                </div>

                <div className="mt-4 text-center">
                    <Link href="/" className="text-primary hover:underline text-sm">
                        ← মূল সাইটে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    )
}
