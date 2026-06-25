import Head from "next/head";
import { Inter, Poppins } from "next/font/google";
import { useState } from "react";
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

export default function CoinsClothCase() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Back', ariaLabel: 'Go back', link: '/' },
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/IbrahimRaafat' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/ibrahimraafat2000/' },
  ];

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
    <div className={`${inter.variable} ${poppins.variable} font-sans min-h-screen relative overflow-hidden`}>
      <Head>
        <title>Coins & Cloth | Ibrahim Raafat</title>
        <meta name="description" content="E-commerce platform with custom dashboards and workflow automation" />
      </Head>

      {/* Grainient Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Grainient
          color1="#622738"
          color2="#f7ede6"
          color3="#e75c2f"
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
        menuButtonColor="#000"
        openMenuButtonColor="#000"
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        {/* Title & Description Section */}
        <section className="mb-20 pt-20 px-12 py-16 rounded-3xl backdrop-blur-lg bg-white/30 border border-white/40">
          <div className="inline-block px-4 py-1.5 backdrop-blur-md bg-white/20 text-black rounded-full text-xs font-semibold mb-6 border border-white/30">
            ERP & AI Automation
          </div>

          <div className="flex items-center justify-between gap-8 mb-8">
            <h1 className="text-6xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
              Coins & Cloth
            </h1>
          </div>

          <p className="text-lg text-black leading-relaxed max-w-3xl">
            A complete e-commerce platform with custom dashboards for real-time insights, automated workflows with n8n integration, and Slack notifications for seamless operations and business intelligence.
          </p>
        </section>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Dashboard Card */}
          <div className="group rounded-2xl p-12 backdrop-blur-lg bg-white/30 border border-white/40 hover:border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img src="/images/charts-icon.png" alt="Charts" className="w-full h-40 object-cover mb-8 rounded-3xl" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Custom Dashboards</h3>
              <p className="text-black leading-relaxed">
                Real-time dashboards with notifications, KPI tracking, sales analytics, and automated reports for data-driven business decisions.
              </p>
            </div>

          {/* Odoo ERP Card */}
          <div className="group rounded-2xl p-12 backdrop-blur-lg bg-white/30 border border-white/40 hover:border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img src="/images/odoo-logo.svg" alt="Odoo" className="w-full h-40 object-contain mb-8" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Odoo ERP</h3>
              <p className="text-black leading-relaxed">
                Enterprise resource planning system with inventory management, order processing, multi-warehouse support, and supplier management.
              </p>
            </div>

          {/* Slack Integration Card */}
          <div className="group rounded-2xl p-12 backdrop-blur-lg bg-white/30 border border-white/40 hover:border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img src="/images/slack-logo.svg" alt="Slack" className="w-full h-40 object-contain mb-8" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Slack Integrations</h3>
              <p className="text-black leading-relaxed">
                Real-time Slack notifications for orders, inventory alerts, dashboard updates, and automated reports keeping the team informed.
              </p>
            </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl p-10 backdrop-blur-lg bg-white/30 border border-white/40">
          <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
            Interested?
          </h2>
          <p className="text-black mb-8">Let's discuss your project. Fill out the form below and I'll get back to you shortly.</p>

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
              className="w-full text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105"
              style={{ backgroundColor: '#4d020e' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6a032e'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4d020e'}
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
