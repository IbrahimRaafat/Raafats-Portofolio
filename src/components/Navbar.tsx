import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/30 backdrop-blur-lg border-2 border-blue-500 rounded-4xl px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between gap-8">
          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'text-blue-800 font-medium scale-110'
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                {section.label}
              </button>
            ))}

            {/* Language Switcher */}
            {/* <div className="flex items-center gap-1 ml-4 border-blue-500 pl-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Ar
              </button>
              <span className="text-blue-500">|</span>
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Eng
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar