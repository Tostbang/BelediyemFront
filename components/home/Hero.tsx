import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-slate-800 bg-opacity-80 text-white text-center bg-blend-overlay bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1200x600')"}}>
      <div className="w-11/12 max-w-7xl mx-auto px-5">
        <h1 className="text-5xl md:text-6xl font-bold mb-5">Şikayetlerinizi Doğrudan Belediyenize İletin</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10">BelediyeM uygulaması ile şehrinizde gördüğünüz sorunları anında belediyenize bildirin, çözüm sürecini takip edin ve daha yaşanabilir bir şehir için katkıda bulunun.</p>
        <div className="flex flex-col md:flex-row justify-center gap-5">
          <Link href="#download" className="bg-red-500 text-white px-5 py-2.5 rounded hover:bg-red-700 transition-colors font-medium">
            Uygulamayı İndir
          </Link>
          <Link href="#how-it-works" className="border-2 border-white px-5 py-2.5 rounded hover:bg-white hover:text-slate-800 transition-colors font-medium">
            Nasıl Çalışır?
          </Link>
        </div>
      </div>
    </section>
  );
}
