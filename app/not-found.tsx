import Link from 'next/link';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default async function NotFound() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
                <div className="mb-8">
                    <FaExclamationTriangle className="text-pink-600 text-6xl" />
                </div>
                <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                    404
                </h1>
                <div className="max-w-xl mx-auto space-y-6 mt-8">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Oops! Sayfa Bulunamadı
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                        Ana sayfaya dönerek devam edebilirsiniz.
                    </p>
                    <div className="flex justify-center space-x-4 mt-8">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <FaHome className="text-xl" />
                            <span>Ana Sayfaya Dön</span>
                        </Link>
                    </div>
                </div>
                <div className="mt-12 text-sm text-gray-500">
                    Yardıma ihtiyacınız varsa bizimle iletişime geçebilirsiniz.
                </div>
            </div>
        </>
    );
}
