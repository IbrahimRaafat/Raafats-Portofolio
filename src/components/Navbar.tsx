import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import PageTransition from './PageTransition'

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactSection, setIsContactSection] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog', external: true, href: 'https://blog.ibrahimraafat.com' },
    { id: 'contact', label: 'Contact' },
  ]

  const TRANSITION_DURATION = 700

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            setIsContactSection(section.id === 'contact')
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }
  }

  const handleExternalNavigate = (href: string) => {
    setIsMenuOpen(false)
    setIsTransitioning(true)
    setTimeout(() => {
      window.location.href = href
    }, TRANSITION_DURATION)
  }

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto">
        <div className={`bg-white/30 backdrop-blur-lg border-2 rounded-4xl px-4 md:px-6 py-3 shadow-sm transition-all duration-300 ${
          isContactSection ? 'border-white' : 'border-blue-500'
        }`}>
          <div className="flex items-center justify-between">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {sections.map((section) => (
                section.external ? (
                  <button
                    key={section.id}
                    onClick={() => handleExternalNavigate(section.href as string)}
                    className={`font-medium transition-all duration-300 ${isContactSection ? 'text-white/80 hover:text-white' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    {section.label}
                  </button>
                ) : (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`font-medium transition-all duration-300 ${
                      activeSection === section.id
                        ? `${isContactSection ? 'text-white' : 'text-blue-800'} font-medium scale-110`
                        : `${isContactSection ? 'text-white/80 hover:text-white' : 'text-blue-600 hover:text-blue-800'}`
                    }`}
                  >
                    {section.label}
                  </button>
                )
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden transition-all duration-300 hover:scale-110 active:scale-95 ${
                isContactSection ? 'text-white hover:text-white/80' : 'text-blue-600 hover:text-blue-800'
              }`}
              aria-label="Toggle menu"
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>

            {/* Mobile Menu Text (when closed) */}
            <div className={`md:hidden flex-1 text-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
              <span className={`font-medium ${isContactSection ? 'text-white' : 'text-blue-600'}`}>
                {sections.find(s => s.id === activeSection)?.label || 'Menu'}
              </span>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-64 opacity-100 mt-4 pt-4' : 'max-h-0 opacity-0'
            } ${isContactSection ? 'border-t border-white/30' : 'border-t border-blue-300'}`}
          >
            <div className="flex flex-col gap-3">
              {sections.map((section, index) => (
                section.external ? (
                  <button
                    key={section.id}
                    onClick={() => handleExternalNavigate(section.href as string)}
                    className={`font-medium transition-all duration-300 text-left px-3 py-2 rounded-lg transform ${isContactSection ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50/50'} hover:translate-x-1`}
                    style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                  >
                    {section.label}
                  </button>
                ) : (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`font-medium transition-all duration-300 text-left px-3 py-2 rounded-lg transform ${
                      activeSection === section.id
                        ? `${isContactSection ? 'text-white bg-white/20' : 'text-blue-800 bg-blue-100/50'} scale-105`
                        : `${isContactSection ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50/50'} hover:translate-x-1`
                    }`}
                    style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                  >
                    {section.label}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      </nav>

      <PageTransition active={isTransitioning} duration={TRANSITION_DURATION} />
    </>
  )
}

export default Navbar