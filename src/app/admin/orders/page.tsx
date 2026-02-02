import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        include: {
            user: true,
            items: {
                include: { product: true }
            }
        },
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">অর্ডার ব্যবস্থাপনা</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="text-left py-4 px-6">অর্ডার আইডি</th>
                            <th className="text-left py-4 px-6">কাস্টমার</th>
                            <th className="text-left py-4 px-6">মোট মূল্য</th>
                            <th className="text-left py-4 px-6">স্ট্যাটাস</th>
                            <th className="text-left py-4 px-6">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500">
                                    এখনো কোনো অর্ডার নেই
                                </td>
                            </tr>
                        ) : (
                            orders.map((order: any) => {
                                const getDisplayName = () => {
                                    if (order.customerName) return order.customerName
                                    if (order.user?.name) return order.user.name
                                    // Legacy fallback: Name - Mobile, Address
                                    const match = order.shippingAddress.match(/^(.*?) - (.*?),/)
                                    return match ? match[1] : 'অতিথি'
                                }

                                return (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="py-4 px-6 font-medium">#{order.id}</td>
                                        <td className="py-4 px-6">{getDisplayName()}</td>
                                        <td className="py-4 px-6">৳{order.total}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {order.status === 'PENDING' ? 'অপেক্ষমান' :
                                                    order.status === 'PROCESSING' ? 'প্রসেসিং' :
                                                        order.status === 'DELIVERED' ? 'ডেলিভারড' : 'বাতিল'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400">
                                                    {new Date(order.createdAt).toLocaleDateString('bn-BD')}
                                                </span>
                                                <Link
                                                    href={`/admin/orders/${order.id}`}
                                                    className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors border border-blue-100 text-sm font-bold"
                                                >
                                                    বিস্তারিত
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
