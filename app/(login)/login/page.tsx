import { BuildingIcon, PersonIcon, UserIcon } from '@/components/icons';
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
                            <div className="mb-4 w-12 h-12 mx-auto text-blue-600">
                                <UserIcon />
                            </div>
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
                            <div className="mb-4 w-12 h-12 mx-auto text-green-600">
                                <BuildingIcon />
                            </div>
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
                        <div className="mb-4 w-12 h-12 mx-auto text-purple-600">
                            <PersonIcon />
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
