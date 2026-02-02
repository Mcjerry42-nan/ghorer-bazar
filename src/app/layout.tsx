import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'
import { Hind_Siliguri } from 'next/font/google'
import ChatWidget from '@/components/ChatWidget'

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
})


export const metadata = {
  title: 'ঘরের বাজার - খাঁটি পণ্যের অনলাইন মার্কেটপ্লেস',
  description: 'বাংলাদেশের সেরা অনলাইন মার্কেটপ্লেস খাঁটি ও প্রাকৃতিক পণ্যের জন্য',
}

import { CartProvider } from '@/context/cart-context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  )
}
