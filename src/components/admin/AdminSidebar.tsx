'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItem {
    href: string
    label: string
    icon: string
    badge?: number | null
}

interface AdminSidebarProps {
    orderCount: number
    msgCount: number
}

export default function AdminSidebar({ orderCount, msgCount }: AdminSidebarProps) {
    const pathname = usePathname()

    // Don't show sidebar on login page
    if (pathname === '/admin') {
        return null
    }

    const menuItems: SidebarItem[] = [
        { href: '/admin/dashboard', label: 'ড্যাশবোর্ড', icon: '📊' },
        { href: '/admin/products', label: 'পণ্য ব্যবস্থাপনা', icon: '📦' },
        { href: '/admin/categories', label: 'ক্যাটাগরি', icon: '📁' },
        {
            href: '/admin/orders',
            label: 'অর্ডার ব্যবস্থাপনা',
            icon: '🛒',
            badge: orderCount > 0 ? orderCount : null
        },
        {
            href: '/admin/messages',
            label: 'মেসেজ',
            icon: '💬',
            badge: msgCount > 0 ? msgCount : null
        },
    ]

    return (
        <aside className="w-64 bg-white min-h-screen shadow-sm sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg transition ${pathname === item.href
                            ? 'bg-primary text-white shadow-lg'
                            : 'hover:bg-gray-100'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-semibold">{item.label}</span>
                        </div>
                        {item.badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pathname === item.href ? 'bg-white text-primary' : 'bg-red-500 text-white'
                                }`}>
                                {item.badge}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
