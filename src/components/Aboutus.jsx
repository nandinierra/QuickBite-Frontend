


const AboutUs = () => {
  return (
    <section className="md:mt-[70px] mt-20 min-h-screen bg-transparent flex flex-col items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl text-center mb-12 sm:mb-16 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-6 animate-fade-in font-playfair">
          About <span className="text-primary text-shadow-glow">QuickBite</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
          Welcome to <strong className="text-white">QuickBite</strong> — your one-stop destination for fast, fresh,
          and flavorful food delivered straight to your doorstep!
          We believe that great food should be <span className="text-primary font-semibold">easy to find</span>,
          <span className="text-primary font-semibold"> fun to explore</span>,
          and <span className="text-primary font-semibold"> quick to enjoy</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-6xl w-full">

        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 animate-fade-in-up hover:-translate-y-2">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl">🎯</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white font-outfit">Our Mission</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">
            At QuickBite, our mission is to make your dining experience hassle-free.
            Whether it's a cheesy pizza, a refreshing drink, or a healthy salad,
            we deliver taste and convenience in every bite. We aim to connect food lovers
            with their favorite local dishes faster than ever.
          </p>
        </div>


        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 animate-fade-in-up hover:-translate-y-2">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl">🌟</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white font-outfit">Our Vision</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">
            We envision a world where good food is always within reach.
            QuickBite strives to build a smart food ecosystem that blends technology,
            taste, and trust — bringing you an effortless ordering experience.
          </p>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 max-w-5xl w-full animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center font-playfair">Why Choose QuickBite?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { icon: "🍕", title: "Fresh Ingredients", desc: "Fresh and hygienic ingredients in every meal" },
            { icon: "🚀", title: "Fast Delivery", desc: "Lightning-fast delivery experience" },
            { icon: "💳", title: "Secure Payments", desc: "Safe and secure online payments" },
            { icon: "📱", title: "Easy to Use", desc: "Easy-to-use, modern interface with live tracking" },
            { icon: "👨‍🍳", title: "Great Support", desc: "Dedicated support for a seamless experience" },
            { icon: "⭐", title: "Quality Food", desc: "Premium quality dishes from trusted vendors" }
          ].map((item, index) => (
            <div key={index} className="glass-panel rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all hover:translate-x-2">
              <div className="text-4xl mb-3 filter drop-shadow-lg">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 sm:mt-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-primary hover:bg-red-700 text-white px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-primary/50 hover:scale-105 transform border border-white/10"
        >
          Back to Top
        </button>
      </div>
    </section>
  );
};

export default AboutUs;
