import React, { useState } from 'react'
import {
  Mail,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  MapPin,
  Clock,
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState<{
    state: 'idle' | 'loading' | 'success' | 'error'
    message?: string
  }>({ state: 'idle' })

  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ibrahimraafatt@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ state: 'loading' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to send message')
      }

      setStatus({ state: 'success', message: 'Message sent successfully! I will get back to you shortly.' })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      setStatus({ state: 'error', message })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-4 relative bg-[#f1f1f1] border-t border-gray-200"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl px-4 sm:px-8 md:px-16 lg:px-24 w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Availability & Direct Channels (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
                Get In Touch
              </p>
              <h2
                id="contact-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4"
              >
                Let&apos;s Build Something Together
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg">
                Have a project in mind, an ERP that needs taming, or a pipeline to scale? Let&apos;s schedule a quick call or drop me a line below.
              </p>
            </div>

            {/* Location & Time Info */}
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200/80 shadow-2xs">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Cairo, EG · Remote Worldwide</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200/80 shadow-2xs">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Reply time: within 24 hours</span>
              </div>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-3.5 pt-2">
              {/* Email with Copy Action */}
              <div className="group rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-2xs hover:shadow-sm transition-all flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email Address</p>
                    <a
                      href="mailto:ibrahimraafatt@gmail.com"
                      className="text-sm sm:text-base font-bold text-gray-900 hover:text-blue-600 transition-colors truncate block"
                    >
                      ibrahimraafatt@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-blue-300 text-xs font-semibold text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* GitHub Card */}
              <a
                href="https://github.com/IbrahimRaafat"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-2xs hover:shadow-sm hover:border-gray-300 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gray-50 text-gray-900 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Open Source &amp; Code</p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      github.com/IbrahimRaafat
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/in/ibrahimraafat2000/"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-2xs hover:shadow-sm hover:border-gray-300 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Professional Profile</p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      linkedin.com/in/ibrahimraafat2000
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Harmonized Form Card (6 cols) */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Fill out the details below and I&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-gray-800 text-xs sm:text-sm font-semibold mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-label="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder:text-gray-400"
                      placeholder="e.g. Alex Morgan"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-gray-800 text-xs sm:text-sm font-semibold mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-label="Your email address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder:text-gray-400"
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-gray-800 text-xs sm:text-sm font-semibold mb-1.5">
                    Project Details or Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    aria-label="Your message"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all resize-none placeholder:text-gray-400"
                    placeholder="Tell me about your project, timeline, or objectives..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.state === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow hover:scale-[1.005] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status.state === 'loading' ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Status Feedback Banners */}
                {status.state !== 'idle' && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                      status.state === 'success'
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : status.state === 'error'
                        ? 'bg-red-50 border border-red-200 text-red-800'
                        : ''
                    }`}
                    aria-live="polite"
                    role="alert"
                  >
                    {status.state === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
                    ) : status.state === 'error' ? (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                    ) : null}
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
