import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed w-full bg-gradient-to-r from-slate-800 to-blue-500 text-white py-4 z-10 shadow-md">
      <div className="w-11/12 max-w-7xl mx-auto px-5">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Belediye<span className="text-red-500">M</span>
          </Link>
          <ul className="hidden md:flex">
            <li className="ml-8"><Link href="#features" className="text-white font-medium hover:text-red-500 transition-colors">Özellikler</Link></li>
            <li className="ml-8"><Link href="#how-it-works" className="text-white font-medium hover:text-red-500 transition-colors">Nasıl Çalışır</Link></li>
            <li className="ml-8"><Link href="#screenshots" className="text-white font-medium hover:text-red-500 transition-colors">Ekran Görüntüleri</Link></li>
            <li className="ml-8"><Link href="#testimonials" className="text-white font-medium hover:text-red-500 transition-colors">Kullanıcı Yorumları</Link></li>
            <li className="ml-8"><Link href="#contact" className="text-white font-medium hover:text-red-500 transition-colors">İletişim</Link></li>
          </ul>
          <Link href="#download" className="bg-red-500 text-white px-5 py-2.5 rounded hover:bg-red-700 transition-colors font-medium">
            Hemen İndir
          </Link>
        </nav>
      </div>
    </header>
  );
}
