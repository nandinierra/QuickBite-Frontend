



import { useState } from "react";
import { toast } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Enforce lowercase for email
    const finalValue = name === "email" ? value.toLowerCase() : value;

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate sending
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <section className="md:mt-[70px] min-h-screen mt-20 bg-transparent flex flex-col items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Heading */}
      <div className="max-w-4xl text-center mb-12 sm:mb-16 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-6 animate-fade-in font-playfair">
          Contact <span className="text-primary text-shadow-glow">QuickBite</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
          We'd love to hear from you! Whether you have questions, feedback, or just want to say hi —
          our team is here to help you enjoy a smoother food ordering experience.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-6xl w-full">
        {/* Contact Form */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 animate-fade-in-up">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8 font-outfit">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`glass-input ${errors.name ? "border-red-500" : ""}`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`glass-input ${errors.email ? "border-red-500" : ""}`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={`glass-input resize-none ${errors.message ? "border-red-500" : ""}`}
                placeholder="Type your message here..."
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-primary/50 text-sm sm:text-base"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col justify-center animate-fade-in-up">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8 font-outfit">Get in touch</h2>
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl sm:text-3xl">📍</span>
              <div>
                <p className="font-semibold text-white">Address</p>
                <p className="text-gray-400 text-sm sm:text-base">45, Food Street, Hyderabad, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl sm:text-3xl">📞</span>
              <div>
                <p className="font-semibold text-white">Phone</p>
                <p className="text-gray-400 text-sm sm:text-base">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl sm:text-3xl">📧</span>
              <div>
                <p className="font-semibold text-white">Email</p>
                <p className="text-gray-400 text-sm sm:text-base">support@quickbite.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl sm:text-3xl">🕒</span>
              <div>
                <p className="font-semibold text-white">Working Hours</p>
                <p className="text-gray-400 text-sm sm:text-base">9:00 AM – 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
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

export default ContactUs;
