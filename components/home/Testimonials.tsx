import ImageWithSkeleton from '../common/imageSkeleton';

export default function Testimonials() {
    const testimonials = [
        {
            text: '"Mahallemizde uzun süredir tamir edilmeyen bir yol vardı. BelediyeM uygulaması sayesinde sorunu bildirdim ve 3 gün içinde tamir edildi. Çok memnunum!"',
            name: 'Ahmet Yılmaz',
            location: 'İstanbul, Kadıköy',
            avatar: 'https://placehold.co/50x50',
        },
        {
            text: '"Parkta kırık bir bank vardı ve çocuklar için tehlike oluşturuyordu. Uygulamadan bildirdim, aynı gün içinde gelip onardılar. Belediyemizin bu kadar hızlı çözüm üretmesi çok güzel."',
            name: 'Ayşe Kaya',
            location: 'Ankara, Çankaya',
            avatar: 'https://placehold.co/50x50',
        },
        {
            text: '"Çöp konteynırlarının düzenli boşaltılmaması sorununu bildirdim. Sadece benim sorunum çözülmekle kalmadı, tüm mahalle için çöp toplama saatleri düzenlendi. Artık daha temiz bir çevrede yaşıyoruz."',
            name: 'Mehmet Demir',
            location: 'İzmir, Karşıyaka',
            avatar: 'https://placehold.co/50x50',
        },
    ];

    return (
        <section id="testimonials" className="py-20 bg-gray-100">
            <div className="w-11/12 max-w-7xl mx-auto px-5">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Kullanıcı Yorumları
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        BelediyeM uygulamasını kullanan vatandaşlarımızın
                        deneyimleri ve geri bildirimleri.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 shadow-md">
                            <p className="italic text-gray-700 mb-5">
                                {testimonial.text}
                            </p>
                            <div className="flex items-center">
                                <ImageWithSkeleton
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    width={250}
                                    height={500}
                                    applyStyle={false}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h4 className="font-bold text-slate-800">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        {testimonial.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
