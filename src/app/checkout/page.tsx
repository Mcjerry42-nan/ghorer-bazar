'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'

export default function CheckoutPage() {
    const router = useRouter()
    const { cart, clearCart } = useCart()
    const [loading, setLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        city: '',
        deliveryType: 'inside', // inside | outside
        paymentMethod: 'cash',
    })

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const deliveryCharge = formData.deliveryType === 'inside' ? 60 : 120
    const total = subtotal + deliveryCharge

    useEffect(() => {
        if (cart.length === 0 && !isSubmitting) {
            router.push('/cart')
        }
    }, [cart, router, isSubmitting])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setIsSubmitting(true)

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    total: total,
                    shippingAddress: `${formData.address}, ${formData.city}`,
                    contactName: formData.name,
                    contactMobile: formData.mobile,
                    paymentMethod: formData.paymentMethod,
                    deliveryCharge
                }),
            })

            if (res.ok) {
                clearCart()
                window.scrollTo(0, 0)
                router.push('/order-success')
            } else {
                const errorData = await res.json()
                setIsSubmitting(false)
                alert(`অর্ডার করতে সমস্যা হয়েছে: ${errorData.details || errorData.error || 'অজানা এরর'}`)
                console.error('Order Error:', errorData)
            }
        } catch (error: any) {
            setIsSubmitting(false)
            alert(`একটি এরর হয়েছে: ${error.message}`)
            console.error('Submit Error:', error)
        } finally {
            setLoading(false)
        }
    }

    if (cart.length === 0) return null

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black mb-10 text-gray-900">চেকআউট</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-50 pb-4">১. ডেলিভারি তথ্য</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">পুরো নাম *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                                        placeholder="উদাঃ আব্দুল্লাহ"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">মোবাইল নম্বর *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                                        placeholder="০১৭১২-৩৪৫৬৭৮"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-bold text-gray-700 mb-2">বিস্তারিত ঠিকানা *</label>
                                <textarea
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                                    rows={3}
                                    placeholder="বাসা/ফ্ল্যাট নং, রোড, এলাকা"
                                />
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-bold text-gray-700 mb-2">শহর/জেলা *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                                    placeholder="ঢাকা"
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-50 pb-4">২. ডেলিভারি এরিয়া</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, deliveryType: 'inside' })}
                                    className={`p-5 rounded-2xl border-2 transition-all flex justify-between items-center ${formData.deliveryType === 'inside' ? 'border-primary bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <span className="font-bold">ঢাকার ভিতরে</span>
                                    <span className="text-primary font-black">৳৬০</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, deliveryType: 'outside' })}
                                    className={`p-5 rounded-2xl border-2 transition-all flex justify-between items-center ${formData.deliveryType === 'outside' ? 'border-primary bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <span className="font-bold">ঢাকার বাইরে</span>
                                    <span className="text-primary font-black">৳১২০</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-50 pb-4">৩. পেমেন্ট পদ্ধতি</h2>
                            <div className="space-y-4">
                                <label className="flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer hover:bg-gray-50 transition border-gray-100">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cash"
                                        checked={formData.paymentMethod === 'cash'}
                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        className="w-5 h-5 accent-primary"
                                    />
                                    <span className="font-bold text-lg">ক্যাশ অন ডেলিভারি</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary text-white py-5 rounded-2xl font-bold text-xl hover:bg-secondary hover:shadow-xl hover:scale-[1.01] transition-all active:scale-95 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>অর্ডার প্রসেস হচ্ছে...</>
                            ) : (
                                <>অর্ডার নিশ্চিত করুন <span className="text-2xl">→</span></>
                            )}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-24">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-50 pb-4">অর্ডার সামারি</h2>

                    <div className="space-y-4 mb-8">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between text-sm text-gray-600">
                                <span>{item.title} x {item.quantity}</span>
                                <span className="font-bold">৳{item.price * item.quantity}</span>
                            </div>
                        ))}
                        <div className="pt-4 border-t border-gray-50 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>সাবটোটাল</span>
                                <span className="font-bold">৳{subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>ডেলিভারি চার্জ</span>
                                <span className="font-bold">৳{deliveryCharge}</span>
                            </div>
                            <div className="pt-4 flex justify-between font-black text-2xl text-gray-900">
                                <span>সর্বমোট</span>
                                <span className="text-primary">৳{total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

