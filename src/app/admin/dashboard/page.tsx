import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminDashboard() {
    // Get stats
    const [productCount, orderCount, categoryCount, userCount] =
        await Promise.all([
            prisma.product.count(),
            prisma.order.count(),
            prisma.category.count(),
            prisma.user.count(),
        ])

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            user: true,
        },
    })

    const stats = [
        { title: 'মোট পণ্য', value: productCount, icon: '📦', color: 'bg-blue-500' },
        { title: 'মোট অর্ডার', value: orderCount, icon: '🛒', color: 'bg-green-500' },
        {
            title: 'মোট ক্যাটাগরি',
            value: categoryCount,
            icon: '📁',
            color: 'bg-purple-500',
        },
        { title: 'মোট কাস্টমার', value: userCount, icon: '👥', color: 'bg-orange-500' },
    ]

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">ড্যাশবোর্ড</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold">{stat.value}</p>
                            </div>
                            <div
                                className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">সাম্প্রতিক অর্ডার</h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">অর্ডার আইডি</th>
                                <th className="text-left py-3 px-4">কাস্টমার</th>
                                <th className="text-left py-3 px-4">মোট</th>
                                <th className="text-left py-3 px-4">স্ট্যাটাস</th>
                                <th className="text-left py-3 px-4">তারিখ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-gray-500">
                                        কোনো অর্ডার নেই
                                    </td>
                                </tr>
                            ) : (
                                recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">#{order.id}</td>
                                        <td className="py-3 px-4">{order.user?.name || 'N/A'}</td>
                                        <td className="py-3 px-4">৳{order.total}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${order.status === 'PENDING'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : order.status === 'DELIVERED'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {new Date(order.createdAt).toLocaleDateString('bn-BD')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
