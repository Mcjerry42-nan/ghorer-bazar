'use client'

import React from 'react'
import Link from 'next/link'

export default function OrderSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-6xl mb-8 animate-bounce">
                ✓
            </div>

            <h1 className="text-5xl font-black mb-6 text-gray-900">অভিনন্দন!</h1>
            <p className="text-2xl text-gray-600 mb-4 font-medium">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।</p>
            <p className="text-gray-500 mb-12 max-w-lg leading-relaxed">
                আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন। আপনার পণ্যটি দ্রুত পৌঁছে দেয়ার জন্য আমরা কাজ করছি। ঘরের বাজার এর সাথে থাকার জন্য ধন্যবাদ।
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-secondary hover:shadow-xl hover:scale-105 transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                    হোমপেজে ফিরে যান
                </Link>
                <Link
                    href="/products"
                    className="bg-gray-100 text-gray-800 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-200 transition-all active:scale-95"
                >
                    আরও কেনাকাটা করুন
                </Link>
            </div>
        </div>
    )
}
