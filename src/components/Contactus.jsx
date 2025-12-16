



const ContactUs = () => {
  return (
    <section className="md:mt-32 min-h-screen mt-7 bg-gradient-to-b from-white to-gray-50 flex flex-col items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Heading */}
      <div className="max-w-4xl text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 sm:mb-6">
          Contact <span className="text-red-600">QuickBite</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We'd love to hear from you! Whether you have questions, feedback, or just want to say hi — 
          our team is here to help you enjoy a smoother food ordering experience.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-6xl w-full">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-t-4 border-red-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">Send us a message</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent successfully!");
            }}
            className="space-y-4 sm:space-y-5"
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Name</label>
              <input
                type="text"
                required
                className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all text-sm sm:text-base"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Email</label>
              <input
                type="email"
                required
                className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all text-sm sm:text-base"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Message</label>
              <textarea
                rows="5"
                required
                className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all resize-none text-sm sm:text-base"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-t-4 border-red-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">Get in touch</h2>
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl sm:text-3xl">📍</span>
              <div>
                <p className="font-semibold text-gray-800">Address</p>
                <p className="text-gray-600 text-sm sm:text-base">45, Food Street, Hyderabad, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl sm:text-3xl">📞</span>
              <div>
                <p className="font-semibold text-gray-800">Phone</p>
                <p className="text-gray-600 text-sm sm:text-base">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl sm:text-3xl">📧</span>
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600 text-sm sm:text-base">support@quickbite.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl sm:text-3xl">🕒</span>
              <div>
                <p className="font-semibold text-gray-800">Working Hours</p>
                <p className="text-gray-600 text-sm sm:text-base">9:00 AM – 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
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

export default ContactUs;
