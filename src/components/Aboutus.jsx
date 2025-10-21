


const AboutUs = () => {
  return (
    <section className="md:mt-32 mt-7 min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6">
      <div className="max-w-6xl text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          About <span className="text-red-600">QuickBite</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Welcome to <strong>QuickBite</strong> -your one-stop destination for fast, fresh, 
          and flavorful food delivered straight to your doorstep!  
          We believe that great food should be <span className="text-red-500 font-semibold">easy to find</span>, 
          <span className="text-red-500 font-semibold">fun to explore</span>, 
          and <span className="text-red-500 font-semibold">quick to enjoy</span>.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl">
       
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
         
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At QuickBite, our mission is to make your dining experience hassle-free.
            Whether it’s a cheesy pizza, a refreshing drink, or a healthy salad,
            we deliver taste and convenience in every bite. We aim to connect food lovers
            with their favorite local dishes faster than ever.
          </p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
         
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a world where good food is always within reach.
            QuickBite strives to build a smart food ecosystem that blends technology,
            taste, and trust — bringing you an effortless ordering experience.
          </p>
        </div>
      </div>


      <div className="mt-16 max-w-5xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose QuickBite?</h2>
        <ul className="text-gray-700 text-lg space-y-3">
          <li>🍕 Fresh and hygienic ingredients in every meal</li>
          <li>🚀 Lightning-fast delivery experience</li>
          <li>💳 Safe and secure online payments</li>
          <li>📱 Easy-to-use, modern interface with live tracking</li>
          <li>👨‍🍳 Dedicated support for a seamless experience</li>
        </ul>
      </div>

      <div className="mt-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-md"
        >
          Back to Top
        </button>
      </div>
    </section>
  );
};

export default AboutUs;
