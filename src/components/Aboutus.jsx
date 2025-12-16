


const AboutUs = () => {
  return (
    <section className="md:mt-32 mt-7 min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 sm:mb-6">
          About <span className="text-red-600">QuickBite</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Welcome to <strong>QuickBite</strong> — your one-stop destination for fast, fresh, 
          and flavorful food delivered straight to your doorstep!  
          We believe that great food should be <span className="text-red-600 font-semibold">easy to find</span>, 
          <span className="text-red-600 font-semibold"> fun to explore</span>, 
          and <span className="text-red-600 font-semibold"> quick to enjoy</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-6xl w-full">
       
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-l-4 border-red-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl">🎯</div>
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            At QuickBite, our mission is to make your dining experience hassle-free.
            Whether it's a cheesy pizza, a refreshing drink, or a healthy salad,
            we deliver taste and convenience in every bite. We aim to connect food lovers
            with their favorite local dishes faster than ever.
          </p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-l-4 border-red-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl">🌟</div>
            <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We envision a world where good food is always within reach.
            QuickBite strives to build a smart food ecosystem that blends technology,
            taste, and trust — bringing you an effortless ordering experience.
          </p>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 max-w-5xl w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 sm:mb-12 text-center">Why Choose QuickBite?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { icon: "🍕", title: "Fresh Ingredients", desc: "Fresh and hygienic ingredients in every meal" },
            { icon: "🚀", title: "Fast Delivery", desc: "Lightning-fast delivery experience" },
            { icon: "💳", title: "Secure Payments", desc: "Safe and secure online payments" },
            { icon: "📱", title: "Easy to Use", desc: "Easy-to-use, modern interface with live tracking" },
            { icon: "👨‍🍳", title: "Great Support", desc: "Dedicated support for a seamless experience" },
            { icon: "⭐", title: "Quality Food", desc: "Premium quality dishes from trusted vendors" }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-600 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 sm:mt-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
        >
          Back to Top
        </button>
      </div>
    </section>
  );
};

export default AboutUs;
