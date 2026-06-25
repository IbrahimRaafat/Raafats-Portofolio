import Head from "next/head";
import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function MazCase() {
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

  return (
    <div className={`${inter.variable} ${poppins.variable} font-sans bg-[#f1f1f1] min-h-screen`}>
      <Head>
        <title>Maz Mrkt | Ibrahim Raafat</title>
        <meta name="description" content="Odoo ERP & Shopify e-commerce solution for Maz Mrkt" />
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
            ← Back
          </Link>
          <div className="w-24 h-10 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: 'url(/images/maz-logo.svg)' }} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-20">
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-6 border border-blue-200">
            E-Commerce & ERP Solution
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
            Maz Mrkt
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            A comprehensive e-commerce and ERP solution combining Odoo inventory management with Shopify storefront,
            featuring real-time dashboards for tracking sales, inventory, and key business metrics.
          </p>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {/* Odoo Card */}
          <div className="group bg-white rounded-2xl p-12 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <img src="/images/odoo-logo.svg" alt="Odoo" className="w-20 h-20 object-contain mb-8" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Odoo ERP</h3>
            <p className="text-gray-600 leading-relaxed">
              Enterprise resource planning system with inventory management, order processing, multi-warehouse support, and supplier management.
            </p>
          </div>

          {/* Shopify Card */}
          <div className="group bg-white rounded-2xl p-12 border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <img src="/images/shopify-logo.svg" alt="Shopify" className="w-20 h-20 object-contain mb-8" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Shopify Store</h3>
            <p className="text-gray-600 leading-relaxed">
              Custom storefront design with seamless Odoo integration, payment gateway setup, and real-time inventory synchronization.
            </p>
          </div>

          {/* Analytics Card */}
          <div className="group bg-white rounded-2xl p-12 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <img src="/images/superset-logo.svg" alt="Apache Superset" className="w-20 h-20 object-contain mb-8" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Analytics Dashboard</h3>
            <p className="text-gray-600 leading-relaxed">
              Custom dashboards built with Apache Superset for real-time sales tracking, inventory monitoring, KPI analytics, and interactive reports.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm">
          <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
            Interested?
          </h2>
          <p className="text-gray-600 mb-8">Let's discuss your project. Fill out the form below and I'll get back to you shortly.</p>

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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
