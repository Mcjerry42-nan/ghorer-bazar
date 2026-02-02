export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">যোগাযোগ করুন</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">আমাদের পাঠিয়ে দিন</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">নাম</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" placeholder="আপনার নাম" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">ইমেইল</label>
                            <input type="email" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" placeholder="test@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">বার্তা</label>
                            <textarea className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" rows={5} placeholder="আপনার বার্তা..."></textarea>
                        </div>
                        <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition">
                            বার্তা পাঠান
                        </button>
                    </form>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-2">অফিস ঠিকানা</h3>
                        <p className="text-gray-600">ঢাকা, বাংলাদেশ। আমাদের অফিস পরিদর্শনে আপনাদের স্বাগতম।</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">ফোন নম্বর</h3>
                        <p className="text-gray-600">+৮৮০ ১৭১২-৩৪৫৬৭৮</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">ইমেইল</h3>
                        <p className="text-gray-600">info@ghorerbazar.com</p>
                    </div>
                    <div className="bg-primary/10 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-2 text-primary">অফিস সময়</h3>
                        <p className="text-gray-700">শনিবার - বৃহস্পতিবার: সকাল ৯টা থেকে সন্ধ্যা ৭টা</p>
                        <p className="text-gray-700">শুক্রবার: বন্ধ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
