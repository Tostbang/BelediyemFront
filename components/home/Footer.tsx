import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white pt-16 pb-5">
      <div className="w-11/12 max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <Link href="/" className="text-2xl font-bold inline-block mb-4">
              Belediye<span className="text-red-500">M</span>
            </Link>
            <p className="text-gray-400 mb-5">BelediyeM, vatandaşların şikayetlerini belediyeye iletmelerini kolaylaştıran ve şehirlerin daha yaşanabilir hale gelmesine katkıda bulunan bir mobil uygulamadır.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">f</a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">t</a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">i</a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">y</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-5">Hızlı Bağlantılar</h3>
            <ul className="space-y-2.5">
              <li><Link href="#features" className="text-gray-400 hover:text-blue-500 transition-colors">Özellikler</Link></li>
              <li><Link href="#how-it-works" className="text-gray-400 hover:text-blue-500 transition-colors">Nasıl Çalışır</Link></li>
              <li><Link href="#screenshots" className="text-gray-400 hover:text-blue-500 transition-colors">Ekran Görüntüleri</Link></li>
              <li><Link href="#testimonials" className="text-gray-400 hover:text-blue-500 transition-colors">Kullanıcı Yorumları</Link></li>
              <li><Link href="#download" className="text-gray-400 hover:text-blue-500 transition-colors">İndir</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-blue-500 transition-colors">İletişim</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-5">Yasal</h3>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Kullanım Koşulları</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">KVKK</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Çerez Politikası</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-5">İletişim Bilgileri</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="mr-3">📍</span> 
                <span className="text-gray-400">Atatürk Cad. No:123, 34000 İstanbul</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">📞</span>
                <span className="text-gray-400">+90 212 123 45 67</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">✉️</span>
                <span className="text-gray-400">info@belediyem.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-5 text-center border-t border-gray-700 text-gray-400 text-sm">
          <p>&copy; 2025 BelediyeM. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
