import React, { useState } from 'react'
import { Mail, Github, Linkedin } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="min-h-screen flex items-center px-4 relative">
      {/* Static fallback background (removed FaultyTerminal to avoid SSR build issues) */}
      <div className="absolute inset-0 w-full h-full bg-linear-to-br from-[#071030] via-[#08264a] to-[#0b3a6b]" />
      {/* Optional subtle blur overlay */}
      <div className="absolute inset-0 w-full h-full bg-white/5 backdrop-blur-sm z-1" />

      {/* Content */}
      <div className="max-w-7xl px-4 sm:px-8 md:px-16 lg:px-24 w-full mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4 sm:mb-6">Contact</h2>
        <p className="text-white text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 lg:mb-16">
          Got a cool project? Let's have a quick call
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-24">
          {/* Left Side - Contact Info */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Email */}
            <div className="flex items-center gap-4 sm:gap-6 group">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white shrink-0" />
              <a 
                href="mailto:ibrahimraafatt@gmail.com"
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-gray-200 transition-colors break-all"
              >
                Ibrahimraafatt@gmail.com
              </a>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-4 sm:gap-6 group">
              <Github className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white shrink-0" />
              <a 
                href="https://github.com/IbrahimRaafat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-gray-200 transition-colors break-all"
              >
                github.com/IbrahimRaafat
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-4 sm:gap-6 group">
              <Linkedin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white shrink-0" />
              <a 
                href="https://www.linkedin.com/in/ibrahimraafat2000/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-gray-200 transition-colors break-all"
              >
                linkedin.com/in/ibrahimraafat2000
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
              {/* Name and Email on Same Line */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-white text-sm mb-1.5 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-full focus:border-blue-600 focus:outline-none transition-colors text-gray-900 text-sm"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white text-sm mb-1.5 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-full focus:border-blue-600 focus:outline-none transition-colors text-gray-900 text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-white text-sm mb-1.5 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-colors resize-none text-gray-900 text-sm"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-30 bg-white text-black font-medium text-xs py-2.5 px-4 rounded-full hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
