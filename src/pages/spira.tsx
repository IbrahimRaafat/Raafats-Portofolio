import Head from "next/head";
import { Inter, Poppins } from "next/font/google";
import { useState } from "react";
import { Cloud, Sparkles, BookOpen } from "lucide-react";
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

export default function SpiraCase() {
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
        <title>Spira | Ibrahim Raafat</title>
        <meta name="description" content="A dreamy, narrative-driven digital storefront for Spira — womenswear that carries a story" />
      </Head>

      {/* Grainient Background — cream & olive, matching Spira's brand palette */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Grainient
          color1="#f4ecdc"
          color2="#faf5ea"
          color3="#7a8f5c"
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
        menuButtonColor="#5c6f3a"
        openMenuButtonColor="#5c6f3a"
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Title & Description Section */}
        <section className="mb-16 pt-20 px-8 sm:px-12 py-16 rounded-3xl backdrop-blur-md bg-white/40 border border-white/30">
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#eef2e4] to-[#faf5ea] text-[#5c6f3a] rounded-full text-xs font-semibold mb-6 border border-[#d8dfc4]">
            Womenswear Brand & Digital Experience
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
              Spira
            </h1>
            <img src="/images/spirahouse-logo.png" alt="Spira" className="w-28 h-auto sm:w-32 lg:w-36 object-contain flex-shrink-0" />
          </div>

          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl italic mb-4">
            &ldquo;Perspective shaped by memory.&rdquo;
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            A dreamy, narrative-driven storefront for Spira — a womenswear brand that reimagines fragments of childhood
            into wearable pieces. The site weaves symbolic imagery (clouds, spirals, bottles, celestial motifs) through
            a fast, modern web build so the collection and the story behind it feel like one continuous moment.
          </p>

          <a
            href="https://www.spirahouse.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-[#7a8f5c] to-[#5c6f3a] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Visit spirahouse.com →
          </a>
        </section>

        {/* Live Site Showcase */}
        <section className="mb-16 px-8 sm:px-12 py-16 rounded-3xl backdrop-blur-md bg-white/40 border border-white/30">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>
            The Site
          </h2>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
            {/* Browser chrome mockup */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4 px-3 py-1.5 bg-white rounded-md text-xs text-gray-500 text-center truncate">
                spirahouse.com
              </div>
            </div>
            <iframe
              src="https://www.spirahouse.com/"
              title="Spira live website preview"
              loading="lazy"
              className="w-full h-[500px] sm:h-[650px] lg:h-[750px] bg-[#f4ecdc]"
            />
          </div>
        </section>

        {/* Highlights Grid */}
        <div className="px-8 sm:px-12 py-16 rounded-3xl backdrop-blur-md bg-white/40 border border-white/30 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-10 border border-gray-200 hover:border-[#c3d1a9] hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-full h-32 flex items-center justify-center mb-6">
                <Cloud size={64} className="text-[#5c6f3a]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                Narrative Storefront
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Product and editorial pages built to carry the brand's symbolic visual language, not just list items for sale.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-10 border border-gray-200 hover:border-[#c3d1a9] hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-full h-32 flex items-center justify-center mb-6">
                <Sparkles size={64} className="text-[#5c6f3a]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                Fast, Modern Build
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A performant Next.js site deployed on Vercel, tuned for smooth transitions and a soft, dreamy feel.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-10 border border-gray-200 hover:border-[#c3d1a9] hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-full h-32 flex items-center justify-center mb-6">
                <BookOpen size={64} className="text-[#5c6f3a]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                The Perspective
              </h3>
              <p className="text-gray-600 leading-relaxed">
                An editorial journal section that carries the brand's story alongside the shop, from Home to Contact.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm">
          <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
            Interested?
          </h2>
          <p className="text-gray-600 mb-8">Let's discuss your brand's digital presence. Fill out the form below and I'll get back to you shortly.</p>

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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a8f5c] focus:border-transparent transition"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a8f5c] focus:border-transparent transition"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a8f5c] focus:border-transparent transition resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7a8f5c] to-[#5c6f3a] hover:shadow-lg text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
