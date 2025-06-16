import ImageWithSkeleton from '../common/imageSkeleton';

export default function Screenshots() {
    const screenshots = [
        { src: 'https://placehold.co/250x500', alt: 'Ana Ekran' },
        { src: 'https://placehold.co/250x500', alt: 'Şikayet Oluşturma' },
        { src: 'https://placehold.co/250x500', alt: 'Şikayet Takibi' },
        { src: 'https://placehold.co/250x500', alt: 'Profil Sayfası' },
    ];

    return (
        <section id="screenshots" className="py-20 bg-white">
            <div className="w-11/12 max-w-7xl mx-auto px-5">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Uygulama Ekran Görüntüleri
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        BelediyeM uygulamasının kullanıcı dostu arayüzünü
                        keşfedin. Basit ve sezgisel tasarımı ile herkes kolayca
                        kullanabilir.
                    </p>
                </div>
                <div className="flex justify-center gap-8 overflow-x-auto py-5 px-2">
                    {screenshots.map((screenshot, index) => (
                        <div
                            key={index}
                            className="relative min-w-[250px] h-[500px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                            <ImageWithSkeleton
                                src={screenshot.src}
                                alt={screenshot.alt}
                                width={250}
                                height={500}
                                applyStyle={false}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
