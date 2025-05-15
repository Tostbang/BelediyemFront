import Link from 'next/link';

export default function Home() {
    return (
        <div className="">
            Tanıtım Sayfası
            <Link
                href="/login"
                className="block bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 transition-colors">
                Giriş Sayfasına git
            </Link>
        </div>
    );
}
