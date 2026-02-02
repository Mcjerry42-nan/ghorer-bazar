'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function OrderDetailsPage() {
    const router = useRouter()
    const { id } = useParams()
    const [order, setOrder] = useState<any>(null)
    const [selectedStatus, setSelectedStatus] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/${id}`)
                if (res.ok) {
                    const data = await res.json()
                    setOrder(data)
                    setSelectedStatus(data.status)
                } else {
                    alert('অর্ডারটি পাওয়া যায়নি।')
                    router.push('/admin/orders')
                }
            } catch (error) {
                console.error('Error fetching order:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [id, router])

    const handleSaveStatus = async () => {
        if (!selectedStatus || selectedStatus === order.status) return

        setUpdating(true)
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: selectedStatus }),
            })
            const data = await res.json()
            if (res.ok) {
                setOrder(data)
                alert('অর্ডার স্ট্যাটাস সফলভাবে সেভ করা হয়েছে।')
                router.refresh()
            } else {
                alert(`স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে: ${data.details || data.error || 'অজানা এরর'}`)
            }
        } catch (error) {
            alert('একটি নেটওয়ার্ক এরর হয়েছে।')
        } finally {
            setUpdating(false)
        }
    }

    if (loading) return <div className="p-8 text-center">লোড হচ্ছে...</div>
    const getLegacyData = () => {
        if (!order || order.customerName) return { name: order?.customerName || order?.user?.name || 'অতিথি', mobile: order?.customerMobile || order?.user?.mobile || 'N/A', address: order?.shippingAddress }

        // Legacy format: Name - Mobile, Address
        const match = order.shippingAddress.match(/^(.*?) - (.*?), (.*)$/)
        if (match) {
            return {
                name: match[1],
                mobile: match[2],
                address: match[3]
            }
        }
        return { name: order.user?.name || 'অতিথি', mobile: order.user?.mobile || 'N/A', address: order.shippingAddress }
    }

    const displayData = getLegacyData()
    const hasChanges = selectedStatus !== order.status

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders" className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-50 border border-gray-100 transition">
                        ⬅️
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800">অর্ডার #{order.id} ডিটেইলস</h1>
                </div>

                <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        {['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setSelectedStatus(s)}
                                disabled={updating}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${selectedStatus === s
                                    ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                                    : 'text-gray-500 hover:text-gray-700'
                                    } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {s === 'PENDING' ? 'অপেক্ষমান' : s === 'PROCESSING' ? 'প্রসেসিং' : s === 'DELIVERED' ? 'ডেলিভারড' : 'বাতিল'}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSaveStatus}
                        disabled={updating || !hasChanges}
                        className={`px-6 py-2 rounded-xl font-bold transition shadow-sm border border-transparent ${hasChanges
                            ? 'bg-primary text-white hover:shadow-lg active:scale-95'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            } ${updating ? 'opacity-50' : ''}`}
                    >
                        {updating ? 'সেভ হচ্ছে...' : 'পরিবর্তন সেভ করুন'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Side: Order Items */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">অর্ডার করা পণ্যসমূহ</h2>
                            <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                বর্তমান অবস্থা: {order.status === 'PENDING' ? 'অপেক্ষমান' :
                                    order.status === 'PROCESSING' ? 'প্রসেসিং' :
                                        order.status === 'DELIVERED' ? 'ডেলিভারড' : 'বাতিল'}
                            </span>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="p-6 flex items-center gap-4 hover:bg-gray-50 transition">
                                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={JSON.parse(item.product.images)[0] || 'https://placehold.co/100x100'}
                                            alt={item.product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{item.product.title}</h3>
                                        <p className="text-gray-500 text-sm">মূল্য: ৳{item.price} x {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-primary">৳{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-gray-600 font-bold">মোট মূল্য:</span>
                            <span className="text-2xl font-black text-gray-900">৳{order.total}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Customer Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-50 pb-4">কাস্টমার তথ্য</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">নাম</p>
                                <p className="text-gray-800 font-semibold">{displayData.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">মোবাইল</p>
                                <p className="text-gray-800 font-semibold font-mono">{displayData.mobile}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-50 pb-4">ডেলিভারি ঠিকানা</h2>
                        <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
                            <p className="text-gray-700 leading-relaxed font-semibold">
                                {displayData.address}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-50 pb-4">অর্ডার তৈরি হয়েছে</h2>
                        <p className="text-gray-600 font-semibold">
                            {new Date(order.createdAt).toLocaleString('bn-BD', {
                                dateStyle: 'full',
                                timeStyle: 'short'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
