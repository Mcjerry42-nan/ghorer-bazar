
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Improved Unsplash URLs with explicit source IDs
  const honey = await prisma.category.create({
    data: {
      name: 'মধু',
      slug: 'honey',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
    },
  })

  const oil = await prisma.category.create({
    data: {
      name: 'তেল',
      slug: 'oil',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcdccef?auto=format&fit=crop&w=400&q=80',
    },
  })

  const ghee = await prisma.category.create({
    data: {
      name: 'ঘি',
      slug: 'ghee',
      image: 'https://images.unsplash.com/photo-1626082866650-70f907869680?auto=format&fit=crop&w=400&q=80',
    },
  })

  const nuts = await prisma.category.create({
    data: {
      name: 'বাদাম ও বীজ',
      slug: 'nuts-seeds',
      image: 'https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?auto=format&fit=crop&w=400&q=80',
    },
  })

  const products = [
    {
      title: 'কাঠের ঘানির খাঁটি সরিষার তেল (১ লিটার)',
      slug: 'mustard-oil-1l',
      description: '১০০% খাঁটি সরিষার তেল। কাঠের ঘানিতে ভাঙানো, কোনো কেমিক্যাল বা প্রিজারভেটিভ নেই।',
      price: 340,
      stock: 50,
      categoryId: oil.id,
      images: JSON.stringify(['https://images.unsplash.com/photo-1474979266404-7eaacbcdccef?auto=format&fit=crop&w=600&q=80']),
    },
    {
      title: 'সুন্দরবনের খলিসা ফুলের মধু (৫০০ গ্রাম)',
      slug: 'sundarban-honey-500g',
      description: 'সুন্দরবনের একদম প্রাকৃতিক মধু। কোনো প্রকার চিনি বা ভেজাল নেই।',
      price: 680,
      stock: 30,
      categoryId: honey.id,
      images: JSON.stringify(['https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80']),
    },
    {
      title: 'দেশী গাওয়া ঘি (৫০০ গ্রাম)',
      slug: 'desi-ghee-500g',
      description: 'বিশুদ্ধ গাওয়া ঘি, যা আপনার রান্নায় যোগ করবে দারুণ স্বাদ ও সুগন্ধ।',
      price: 1150,
      stock: 20,
      categoryId: ghee.id,
      images: JSON.stringify(['https://images.unsplash.com/photo-1626082866650-70f907869680?auto=format&fit=crop&w=600&q=80']),
    },
    {
      title: 'প্রিমিয়াম কোয়ালিটি কাঠবাদাম (৫০০ গ্রাম)',
      slug: 'kathbadam-500g',
      description: 'আমদানি করা সেরা মানের মচমচে কাঠবাদাম।',
      price: 450,
      stock: 100,
      categoryId: nuts.id,
      images: JSON.stringify(['https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?auto=format&fit=crop&w=600&q=80']),
    }
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log('Seeding completed')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
