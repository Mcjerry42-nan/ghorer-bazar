import Link from 'next/link'
import { prisma } from '@/lib/db'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Dynamic stats for sidebar
    const [orderCount, msgCount] = await Promise.all([
        prisma.order.count({ where: { status: 'PENDING' } }),
        prisma.message.count()
    ])

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Bar */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold">ঘরের বাজার অ্যাডমিন</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm text-gray-600 hover:text-primary">
                            ওয়েবসাইট দেখুন
                        </Link>
                        <Link href="/admin" className="text-sm text-red-600 hover:text-red-700">
                            লগআউট
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex">
                <AdminSidebar orderCount={orderCount} msgCount={msgCount} />

                {/* Main Content */}
                <main className="flex-1 p-8 bg-gray-50/50 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

