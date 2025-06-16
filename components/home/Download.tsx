import Link from 'next/link';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

export default function Download() {
    return (
        <section
            id="download"
            className="py-20 bg-gradient-to-r from-slate-800 to-blue-500 text-white text-center">
            <div className="w-11/12 max-w-7xl mx-auto px-5">
                <h2 className="text-4xl md:text-5xl font-bold mb-5">
                    Hemen İndirin
                </h2>
                <p className="text-lg max-w-3xl mx-auto mb-10">
                    BelediyeM uygulamasını ücretsiz olarak indirin ve şehrinizin
                    gelişimine katkıda bulunun. Sorunları bildirmek ve çözüm
                    sürecini takip etmek artık çok kolay!
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-5">
                    <Link
                        href="#"
                        className="flex items-center bg-white text-slate-800 px-6 py-3 rounded-md hover:transform hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-4xl mr-3">
                            <FaApple />
                        </span>
                        <div className="text-left">
                            <span className="block text-sm">İndir</span>
                            <span className="block text-xl font-bold">
                                App Store
                            </span>
                        </div>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center bg-white text-slate-800 px-6 py-3 rounded-md hover:transform hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-3xl mr-3">
                            <FaGooglePlay />
                        </span>
                        <div className="text-left">
                            <span className="block text-sm">İndir</span>
                            <span className="block text-xl font-bold">
                                Google Play
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
