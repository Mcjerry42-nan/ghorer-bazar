import { prisma } from '@/lib/db'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 8,
    include: {
      category: true,
    },
  })

  const categories = await prisma.category.findMany()

  return (
    <div className="flex-1 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80')] opacity-15 bg-cover bg-center"></div>
        <div className="container relative py-24 md:py-32 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            ঘরের বাজার
          </h1>
          <p className="text-xl md:text-3xl mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed font-medium">
            প্রকৃতির ছোঁয়ায় খাঁটি ও নিরাপদ খাবারের বিশ্বস্ত ঠিকানা
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:shadow-2xl transition hover:scale-105"
            >
              এখনই কিনুন
            </Link>
            <Link
              href="/categories"
              className="px-10 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary transition"
            >
              ক্যাটাগরি দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-10 w-2 bg-primary rounded-full"></div>
          <h2 className="text-4xl font-bold">ক্যাটাগরি সমূহ</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                <img
                  src={category.image || 'https://placehold.co/400x400?text=Category'}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="h-6 w-1 bg-primary rounded-full"></div>
                <span className="text-primary font-bold uppercase tracking-wider">আমাদের পণ্য</span>
              </div>
              <h2 className="text-4xl font-bold">সেরা মানের পণ্যসমূহ</h2>
            </div>
            <Link
              href="/products"
              className="group flex items-center gap-2 text-primary font-bold text-lg"
            >
              সব দেখুন
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product: any) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 text-center">
              <div className="text-5xl mb-6 inline-block p-6 bg-green-50 rounded-full text-primary">🌿</div>
              <h3 className="text-2xl font-bold mb-4">শতভাগ অর্গানিক</h3>
              <p className="text-gray-500 leading-relaxed">
                সরাসরি প্রকৃতি থেকে সংগৃহীত কোনো প্রকার ভেজাল বা কেমিক্যাল ছাড়াই।
              </p>
            </div>
            <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 text-center">
              <div className="text-5xl mb-6 inline-block p-6 bg-blue-50 rounded-full text-blue-500">🚛</div>
              <h3 className="text-2xl font-bold mb-4">ফাস্ট ডেলিভারি</h3>
              <p className="text-gray-500 leading-relaxed">
                আপনার পছন্দের পণ্যটি আমরা পৌঁছে দেব দ্রুততম সময়ে সরাসরি আপনার দোরগোড়ায়।
              </p>
            </div>
            <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 text-center">
              <div className="text-5xl mb-6 inline-block p-6 bg-orange-50 rounded-full text-orange-500">🛡️</div>
              <h3 className="text-2xl font-bold mb-4">নিরাপদ পেমেন্ট</h3>
              <p className="text-gray-500 leading-relaxed">
                ক্যাশ অন ডেলিভারি অথবা যেকোনো অনলাইন পেমেন্টে আমরা দিচ্ছি সর্বোচ্চ নিরাপত্তা।
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
