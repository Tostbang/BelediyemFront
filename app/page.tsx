import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import Screenshots from '@/components/home/Screenshots';
import Testimonials from '@/components/home/Testimonials';
import Download from '@/components/home/Download';
import Contact from '@/components/home/Contact';
import Footer from '@/components/home/Footer';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Screenshots />
            <Testimonials />
            <Download />
            <Contact />
            <Footer />

            <div className="fixed bottom-5 right-5">
                <Link
                    href="/login"
                    className="block bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 transition-colors shadow-lg">
                    Giriş Yap
                </Link>
            </div>
        </div>
    );
}
