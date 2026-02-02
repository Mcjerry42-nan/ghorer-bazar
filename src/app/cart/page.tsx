'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'

export default function CartPage() {
    const { cart, removeFromCart, addToCart, decrementQuantity } = useCart()

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )
    const shipping = cart.length > 0 ? 60 : 0
    const total = subtotal + shipping

    const handleQuantityChange = (id: number, delta: number) => {
        if (delta === -1) {
            decrementQuantity(id)
        } else {
            // addToCart logic stays same for +
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black mb-10 text-gray-900">শপিং কার্ট ({cart.length})</h1>

            {cart.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <div className="text-6xl mb-6">🛒</div>
                    <p className="text-gray-500 text-xl mb-8 font-medium">আপনার কার্ট বর্তমানে খালি আছে</p>
                    <Link
                        href="/products"
                        className="inline-block bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-secondary hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                    >
                        কেনাকাটা শুরু করুন
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-shadow"
                            >
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-50">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1 text-gray-800">{item.title}</h3>
                                    <p className="text-primary font-black text-xl">৳{item.price}</p>
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                        className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-white hover:shadow-sm rounded-xl transition-all"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-bold text-lg text-gray-800">{item.quantity}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-white hover:shadow-sm rounded-xl transition-all"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                                    title="মুছে ফেলুন"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-24">
                        <h2 className="text-2xl font-black mb-6 text-gray-900 border-b border-gray-50 pb-4">অর্ডার সামারি</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-600 font-medium">
                                <span>সাবটোটাল</span>
                                <span>৳{subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 font-medium">
                                <span>ডেলিভারি চার্জ</span>
                                <span>৳{shipping}</span>
                            </div>
                            <div className="border-t border-gray-50 pt-4 flex justify-between font-black text-2xl text-gray-900">
                                <span>মোট</span>
                                <span className="text-primary">৳{total}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="block w-full bg-primary text-white text-center py-5 rounded-2xl font-bold text-xl hover:bg-secondary hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 shadow-lg shadow-primary/10 "
                        >
                            চেকআউট করুন
                        </Link>

                        <Link
                            href="/products"
                            className="block w-full text-center mt-6 text-gray-500 font-bold hover:text-primary transition-colors"
                        >
                            কেনাকাটা চালিয়ে যান
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
