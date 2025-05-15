import { generatePageMetadata } from '@/lib/metadata';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Giriş Seçenekleri');
}

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="z-10 flex flex-col md:flex-row gap-8 items-center justify-center w-full mt-8 md:mt-0">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-64 text-center hover:shadow-xl transition-shadow">
                        <div className="mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 mx-auto text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Admin Girişi
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Sistem yöneticileri için
                        </p>
                        <Link
                            href="/login/admin"
                            className="block bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors">
                            Giriş Yap
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-64 text-center hover:shadow-xl transition-shadow">
                        <div className="mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 mx-auto text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Belediye Girişi
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Belediye kullanıcıları için
                        </p>
                        <Link
                            href="/login/municipality"
                            className="block bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 transition-colors">
                            Giriş Yap
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-64 text-center hover:shadow-xl transition-shadow">
                        <div className="mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 mx-auto text-purple-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Personel Girişi
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Belediye çalışanları için
                        </p>
                        <Link
                            href="/login/staff"
                            className="block bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-700 transition-colors">
                            Giriş Yap
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
