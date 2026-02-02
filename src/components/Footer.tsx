import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function Footer() {
    const categories = await prisma.category.findMany({
        take: 5,
        orderBy: { id: 'asc' }
    })

    return (
        <footer className="bg-gray-900 text-white mt-12">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* About */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black text-primary">ঘরের বাজার</h3>
                        <p className="text-gray-400 leading-relaxed font-medium">
                            খাঁটি ও প্রাকৃতিক খাবারের অনলাইন মার্কেটপ্লেস। আমরা সরাসরি কৃষক ও খামারিদের থেকে সর্বসেরা পণ্য সংগ্রহ করে আপনাদের কাছে পৌঁছে দেই।
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2">দ্রুত লিংক</h4>
                        <ul className="space-y-3 text-gray-400 font-medium">
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2">
                                    <span>→</span> আমাদের সম্পর্কে
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-primary transition-colors flex items-center gap-2">
                                    <span>→</span> সকল পণ্য
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-2">
                                    <span>→</span> যোগাযোগ করুন
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2">ক্যাটাগরি</h4>
                        <ul className="space-y-3 text-gray-400 font-medium">
                            {categories.map((category: any) => (
                                <li key={category.id}>
                                    <Link href={`/categories/${category.slug}`} className="hover:text-primary transition-colors flex items-center gap-2">
                                        <span>→</span> {category.name}
                                    </Link>
                                </li>
                            ))}
                            {categories.length === 0 && (
                                <li className="italic text-gray-500 text-sm">কোনো ক্যাটাগরি নেই</li>
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2">যোগাযোগ</h4>
                        <ul className="space-y-4 text-gray-400 font-medium">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1">📞</span>
                                <div>
                                    <p className="text-sm text-gray-500">ফোন</p>
                                    <p>০১৭১২-৩৪৫৬৭৮</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1">📧</span>
                                <div>
                                    <p className="text-sm text-gray-500">ইমেইল</p>
                                    <p>info@ghorerbazar.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-medium">
                    <p>&copy; ২০২৬ ঘরের বাজার। সর্বস্বত্ব সংরক্ষিত।</p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/about#privacy" className="hover:text-white transition-colors">প্রাইভেসি পলিসি</Link>
                        <Link href="/about#terms" className="hover:text-white transition-colors">শর্তাবলী</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

