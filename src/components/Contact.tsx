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
    <section id="contact" className="min-h-screen flex items-center bg-white/50">
      <div className="max-w-7xl px-8 md:px-16 lg:px-24 w-full mx-auto">
        <h2 className="text-5xl md:text-6xl font-medium text-gray-900 mb-16">Contact</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side - Contact Info */}
          <div className="space-y-10">
            {/* Email */}
            <div className="flex items-center gap-6 group">
              <Mail className="w-10 h-10 md:w-12 md:h-12 text-blue-600 shrink-0" />
              <a 
                href="mailto:ibrahimraafatt@gmail.com"
                className="text-xl md:text-2xl text-blue-600 hover:text-blue-800 transition-colors break-all"
              >
                Ibrahimraafatt@gmail.com
              </a>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-6 group">
              <Github className="w-10 h-10 md:w-12 md:h-12 text-blue-600 shrink-0" />
              <a 
                href="https://github.com/IbrahimRaafat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl text-blue-600 hover:text-blue-800 transition-colors break-all"
              >
                github.com/IbrahimRaafat
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-6 group">
              <Linkedin className="w-10 h-10 md:w-12 md:h-12 text-blue-600 shrink-0" />
              <a 
                href="https://www.linkedin.com/in/ibrahimraafat2000/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl text-blue-600 hover:text-blue-800 transition-colors break-all"
              >
                linkedin.com/in/ibrahimraafat2000
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              {/* Name and Email on Same Line */}
              <div className="grid grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-sm mb-1.5 font-medium">
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
                  <label htmlFor="email" className="block text-gray-700 text-sm mb-1.5 font-medium">
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
                <label htmlFor="message" className="block text-gray-700 text-sm mb-1.5 font-medium">
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
                className="w-30 bg-blue-600 text-white font-medium text-xs py-2.5 px-4 rounded-full hover:bg-blue-700 transition-colors"
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
