'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false)

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    {isRegister ? 'নিবন্ধন করুন' : 'লগইন করুন'}
                </h1>

                <form className="space-y-4">
                    {isRegister && (
                        <div>
                            <label className="block text-sm font-medium mb-2">নাম</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                placeholder="আপনার নাম লিখুন"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            মোবাইল নম্বর
                        </label>
                        <input
                            type="tel"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="০১৭১২-৩৪৫৬৭৮"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">পাসওয়ার্ড</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="পাসওয়ার্ড দিন"
                        />
                    </div>

                    {isRegister && (
                        <div>
                            <label className="block text-sm font-medium mb-2">ঠিকানা</label>
                            <textarea
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                rows={3}
                                placeholder="আপনার ঠিকানা লিখুন"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
                    >
                        {isRegister ? 'নিবন্ধন করুন' : 'লগইন করুন'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-primary hover:underline"
                    >
                        {isRegister
                            ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন'
                            : 'নতুন ব্যবহারকারী? নিবন্ধন করুন'}
                    </button>
                </div>
            </div>
        </div>
    )
}
