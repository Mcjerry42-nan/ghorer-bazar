'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/cart-context'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { cart, favorites } = useCart()
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const favoriteCount = favorites.length

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-primary">
                        ঘরের বাজার
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="hover:text-primary transition">
                            হোম
                        </Link>
                        <Link href="/products" className="hover:text-primary transition">
                            পণ্য
                        </Link>
                        <Link href="/categories" className="hover:text-primary transition">
                            ক্যাটাগরি
                        </Link>
                        <Link href="/about" className="hover:text-primary transition">
                            আমাদের সম্পর্কে
                        </Link>
                        <Link href="/contact" className="hover:text-primary transition">
                            যোগাযোগ
                        </Link>
                    </nav>

                    {/* Right side - Cart & Account */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/cart"
                            className="relative hover:text-primary transition"
                            title="কার্ট"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            href="/favorites"
                            className="relative hover:text-primary transition"
                            title="পছন্দের তালিকা"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            {favoriteCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {favoriteCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            href="/login"
                            className="hidden md:block px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
                        >
                            লগইন
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <nav className="md:hidden py-4 space-y-2">
                        <Link
                            href="/"
                            className="block py-2 hover:text-primary transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            হোম
                        </Link>
                        <Link
                            href="/products"
                            className="block py-2 hover:text-primary transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            পণ্য
                        </Link>
                        <Link
                            href="/categories"
                            className="block py-2 hover:text-primary transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ক্যাটাগরি
                        </Link>
                        <Link
                            href="/about"
                            className="block py-2 hover:text-primary transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            আমাদের সম্পর্কে
                        </Link>
                        <Link
                            href="/contact"
                            className="block py-2 hover:text-primary transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            যোগাযোগ
                        </Link>
                        <Link
                            href="/login"
                            className="block py-2 text-primary font-semibold"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            লগইন
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
}
