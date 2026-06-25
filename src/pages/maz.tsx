import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <div className={`${inter.variable} font-sans bg-[#f1f1f1] min-h-screen`}>
      <Head>
        <title>Maz Mrkt | Ibrahim Raafat</title>
        <meta name="description" content="Odoo ERP & Shopify e-commerce solution for Maz Mrkt" />
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            ← Back
          </Link>
          <div className="w-24 h-10 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: 'url(/images/maz-logo.svg)' }} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-16">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-4">
            E-Commerce & ERP
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Maz Mrkt</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            A comprehensive e-commerce and ERP solution combining Odoo inventory management with Shopify storefront,
            featuring real-time dashboards for tracking sales, inventory, and key business metrics.
          </p>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Odoo ERP</h3>
            <p className="text-gray-600 text-sm">Inventory management, order processing, multi-warehouse support, and supplier management system.</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Shopify Store</h3>
            <p className="text-gray-600 text-sm">Custom storefront design with seamless Odoo integration, payment gateway setup, and real-time inventory sync.</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
            <p className="text-gray-600 text-sm">Real-time sales tracking, inventory monitoring, KPI dashboards, and custom reports for data-driven decisions.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              Thanks for reaching out! I'll be in touch soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
