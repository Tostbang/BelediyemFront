export default function Features() {
  const features = [
    {
      icon: "📸",
      title: "Fotoğraflı Bildirim",
      description: "Şikayetinizi fotoğraf ekleyerek daha etkili bir şekilde iletebilirsiniz. Görsel kanıtlar, sorunun daha hızlı çözülmesine yardımcı olur."
    },
    {
      icon: "📍",
      title: "Konum Tabanlı",
      description: "GPS ile tam konumunuzu belirleyerek şikayetinizin doğru adrese iletilmesini sağlar. Belediye ekipleri sorunu hızlıca bulabilir."
    },
    {
      icon: "🔔",
      title: "Bildirim Takibi",
      description: "Şikayetinizin durumunu gerçek zamanlı olarak takip edin. Belediye tarafından yapılan her güncelleme anında size bildirilir."
    },
    {
      icon: "👥",
      title: "Topluluk Desteği",
      description: "Diğer vatandaşların bildirdiği sorunları görün ve destekleyin. Çok desteklenen sorunlar daha hızlı çözüme kavuşur."
    },
    {
      icon: "🔒",
      title: "Güvenli İletişim",
      description: "Kişisel bilgileriniz güvende kalır. Belediye ile güvenli bir şekilde iletişim kurabilirsiniz."
    },
    {
      icon: "📊",
      title: "İstatistikler",
      description: "Şehrinizde en çok bildirilen sorunları ve çözüm oranlarını görüntüleyin. Belediyenizin performansını takip edin."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="w-11/12 max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Uygulama Özellikleri</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">BelediyeM uygulaması, vatandaşların şikayetlerini kolayca iletebilmesi için tasarlanmış birçok kullanışlı özellik sunmaktadır.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-5 text-blue-500">{feature.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-slate-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
