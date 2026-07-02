import Head from "next/head";
import { Inter, Poppins } from "next/font/google";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import StaggeredMenu from "@/components/StaggeredMenu";
import Grainient from "@/components/Grainient";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function KolrPerfumes() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Experience', ariaLabel: 'View experience', link: '/#experience' },
    { label: 'Projects', ariaLabel: 'View projects', link: '/#projects' },
    { label: 'Blog', ariaLabel: 'Read blog', link: 'https://blog.ibrahimraafat.com' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/#contact' },
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/IbrahimRaafat' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/ibrahimraafat2000/' },
  ];

  return (
    <div className={`${inter.variable} ${poppins.variable} font-sans min-h-screen relative overflow-hidden`}>
      <Head>
        <title>Kolr Perfumes | Ibrahim Raafat</title>
        <meta name="description" content="Premium fragrance e-commerce platform - Kolr Perfumes" />
      </Head>

      {/* Grainient Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Grainient
          color1="#1f2acc"
          color2="#fafafd"
          color3="#0146bb"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Staggered Menu */}
      <StaggeredMenu
        position="right"
        isFixed
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={false}
        menuButtonColor="#1f2acc"
        openMenuButtonColor="#1f2acc"
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Title & Description Section */}
        <section className="mb-20 pt-20 px-6 sm:px-8 md:px-12 py-10 sm:py-16 rounded-3xl backdrop-blur-md bg-white/30 border border-white/20">
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-indigo-100 to-blue-50 text-indigo-700 rounded-full text-xs font-semibold mb-6 border border-indigo-200">
            Premium Fragrance Retail
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
              Kolr Perfumes
            </h1>
            <img src="/images/kolr-logo.webp" alt="Kolr Perfumes" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain flex-shrink-0" />
          </div>

          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            A premium e-commerce platform for Kolr Perfumes, featuring curated fragrances with seamless shopping experience,
            real-time inventory management, and personalized product recommendations.
          </p>
        </section>

        {/* Horizontal Card Section */}
        <div className="px-6 sm:px-8 md:px-12 py-10 sm:py-16 rounded-3xl backdrop-blur-md bg-white/30 border border-white/20 mb-20">
          {/* Shopify Card - Horizontal Layout */}
          <div className="group bg-white rounded-2xl p-6 sm:p-8 md:p-12 border border-gray-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
              {/* Logo Section */}
              <div className="flex-shrink-0 flex items-center justify-center w-32 h-32 sm:w-48 sm:h-48">
                <ShoppingCart size={80} className="text-black sm:hidden" />
                <ShoppingCart size={120} className="text-black hidden sm:block" />
              </div>

              {/* Content Section */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Shopify Store
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  A fully integrated Shopify storefront providing customers with a premium shopping experience.
                  Features include product filtering, customer reviews, secure checkout, and real-time order tracking.
                  Multi-currency support and mobile optimization ensure accessibility for global customers.
                </p>
                <a
                  href="https://kolr.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Visit Store →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm">
          <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
            Interested?
          </h2>
          <p className="text-gray-600 mb-8">Let's discuss your fragrance e-commerce project. Fill out the form below and I'll get back to you shortly.</p>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
              ✓ Thanks for reaching out! I'll be in touch soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-lg text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
