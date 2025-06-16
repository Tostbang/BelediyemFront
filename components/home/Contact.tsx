export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="w-11/12 max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">İletişim</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Sorularınız veya önerileriniz için bizimle iletişime geçebilirsiniz. En kısa sürede size dönüş yapacağız.</p>
        </div>
        <form className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 font-medium text-slate-800">Adınız Soyadınız</label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 font-medium text-slate-800">E-posta Adresiniz</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="subject" className="block mb-2 font-medium text-slate-800">Konu</label>
            <input 
              type="text" 
              id="subject" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="block mb-2 font-medium text-slate-800">Mesajınız</label>
            <textarea 
              id="message" 
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 resize-vertical" 
              required 
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white font-medium py-3 px-6 rounded-md hover:bg-blue-600 transition-colors"
          >
            Gönder
          </button>
        </form>
      </div>
    </section>
  );
}
