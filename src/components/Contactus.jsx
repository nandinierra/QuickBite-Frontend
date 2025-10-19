



const ContactUs = () => {
  return (
    <section className="min-h-screen mt-7 bg-gray-50 flex flex-col items-center py-16 px-6">
      {/* Heading */}
      <div className="max-w-4xl text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Contact <span className="text-red-600">QuickBite</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We’d love to hear from you! Whether you have questions, feedback, or just want to say hi — 
          our team is here to help you enjoy a smoother food ordering experience.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent successfully!");
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                rows="5"
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in touch</h2>
          <div className="space-y-5 text-gray-700 text-lg">
            <p>📍 <strong>Address:</strong> 45, Food Street, Hyderabad, India</p>
            <p>📞 <strong>Phone:</strong> +91 98765 43210</p>
            <p>📧 <strong>Email:</strong> support@quickbite.com</p>
            <p>🕒 <strong>Working Hours:</strong> 9:00 AM – 10:00 PM</p>
          </div>
        </div>
      </div>

      {/* Map / Illustration Section */}
      {/* <div className="max-w-6xl mt-16">
        <img
          src="https://res.cloudinary.com/doicvqkvb/image/upload/v1739625342/food_delivery_map.webp"
          alt="Location map"
          className="rounded-2xl shadow-md"
        />
      </div> */}

      {/* Back to Top Button */}
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

export default ContactUs;
