export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* About Us Section */}
                <div id="about" className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-4xl font-black mb-8 text-primary">আমাদের সম্পর্কে</h1>
                    <div className="prose prose-lg text-gray-700 space-y-6 leading-relaxed">
                        <p className="text-xl">
                            স্বাগতম <strong>ঘরের বাজার</strong>-এ। আমরা বিশ্বাস করি যে সুস্থ জীবনের জন্য খাঁটি খাবারের কোনো বিকল্প নেই।
                        </p>
                        <p>
                            আমাদের লক্ষ্য হলো একদম তৃণমূল পর্যায় থেকে সংগৃহীত খাঁটি, প্রাকৃতিকভাবে উৎপাদিত এবং ভেজালমুক্ত পণ্য সরাসরি আপনার দোরগোড়ায় পৌঁছে দেওয়া। সুন্দরবনের মধু থেকে শুরু করে ঘানিতে ভাঙানো সরিষার তেল - প্রতিটি পণ্যের গুণমান আমরা কঠোরভাবে পরীক্ষা করি।
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 pt-4">আমাদের লক্ষ্য (Our Mission)</h2>
                        <p>
                            আমাদের মূল লক্ষ্য হলো বাংলাদেশের প্রতিটি ঘরে ঘরে স্বাস্থ্যকর এবং নিরাপদ খাদ্য পৌঁছে দেওয়া এবং ছোট উদ্যোক্তাদের উৎসাহিত করা। আমরা চাই ভেজালমুক্ত পণ্য সবার হাতের নাগালে পৌঁছে দিতে।
                        </p>
                    </div>
                </div>

                {/* Privacy Policy Section */}
                <div id="privacy" className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-black mb-8 text-gray-900 border-b border-gray-50 pb-4">প্রাইভেসি পলিসি (Privacy Policy)</h2>
                    <div className="prose prose-lg text-gray-700 space-y-6 leading-relaxed">
                        <p>
                            আপনার ব্যক্তিগত তথ্যের নিরাপত্তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। 'ঘরের বাজার' আপনার গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ।
                        </p>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800">১. তথ্য সংগ্রহ</h3>
                            <p>আমরা শুধুমাত্র আপনার নাম, মোবাইল নম্বর এবং ঠিকানা সংগ্রহ করি যা অর্ডার ডেলিভারি করার জন্য আবশ্যিক।</p>

                            <h3 className="text-xl font-bold text-gray-800">২. তথ্যের ব্যবহার</h3>
                            <p>আপনার তথ্য শুধুমাত্র পণ্য পৌঁছে দেয়া এবং আমাদের অফার সম্পর্কে অবহিত করার জন্য ব্যবহার করা হতে পারে। আমরা কোনো প্রকার থার্ড-পার্টি বা বাইরের প্রতিষ্ঠানের কাছে আপনার তথ্য বিক্রি করি না।</p>

                            <h3 className="text-xl font-bold text-gray-800">৩. নিরাপত্তা</h3>
                            <p>আপনার পার্সোনাল ডাটা আমাদের সিস্টেমে সুরক্ষিত থাকে এবং শুধুমাত্র অনুমোদিত ব্যক্তিরাই তা দেখতে পারেন।</p>
                        </div>
                    </div>
                </div>

                {/* Terms and Conditions Section */}
                <div id="terms" className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-black mb-8 text-gray-900 border-b border-gray-50 pb-4">শর্তাবলী (Terms & Conditions)</h2>
                    <div className="prose prose-lg text-gray-700 space-y-6 leading-relaxed">
                        <p>
                            'ঘরের বাজার' ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি নিম্নলিখিত শর্তাবলী মেনে নিতে সম্মত হচ্ছেন:
                        </p>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800">১. অর্ডার এবং পেমেন্ট</h3>
                            <p>যেকোনো অর্ডার করার পর আমাদের প্রতিনিধি আপনার মোবাইলে কল করে সেটি কনফার্ম করবেন। ক্যাশ অন পেমেন্টের ক্ষেত্রে পণ্য হাতে পেয়ে মূল্য পরিশোধ করবেন।</p>

                            <h3 className="text-xl font-bold text-gray-800">২. ডেলিভারি চার্জ</h3>
                            <p>ঢাকার ভিতরে ডেলিভারি চার্জ ৬০ টাকা এবং ঢাকার বাইরে ১২০ টাকা। তবে বিশেষ ক্ষেত্র বা পণ্যের ওজনের উপর ভিত্তি করে এটি পরিবর্তিত হতে পারে।</p>

                            <h3 className="text-xl font-bold text-gray-800">৩. রিটার্ন পলিসি</h3>
                            <p>পণ্য গ্রহণের সময় কোনো সমস্যা লক্ষ্য করলে আপনি সাথে সাথে ডেলিভারি ম্যানকে সেটি ফেরত দিতে পারেন। গুণগত মানের ব্যাপারে আমরা আপোষহীন।</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
