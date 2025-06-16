export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "İndir ve Kayıt Ol",
      description: "Uygulamayı indirin ve basit bir kayıt işlemi ile hesabınızı oluşturun. T.C. kimlik numaranız ile doğrulama yapılır."
    },
    {
      number: 2,
      title: "Sorunu Bildir",
      description: "Şikayetinizi kategorize edin, fotoğraf ekleyin ve açıklama yazın. Konum otomatik olarak alınır veya manuel olarak belirleyebilirsiniz."
    },
    {
      number: 3,
      title: "Takip Et",
      description: "Şikayetinizin durumunu uygulama üzerinden takip edin. Belediye ekipleri sorunu çözdüğünde bildirim alırsınız."
    },
    {
      number: 4,
      title: "Geri Bildirim Ver",
      description: "Sorun çözüldükten sonra memnuniyetinizi belirtin. Geri bildirimleriniz hizmet kalitesinin artmasına yardımcı olur."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-100">
      <div className="w-11/12 max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Nasıl Çalışır?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">BelediyeM uygulaması ile şikayetlerinizi iletmek çok kolay. Sadece birkaç adımda sorunlarınızı belediyenize bildirebilirsiniz.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {steps.map((step) => (
            <div key={step.number} className="flex-1 min-w-[250px] max-w-[350px] text-center" data-aos="fade-up">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex justify-center items-center text-2xl font-bold mx-auto mb-5">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
