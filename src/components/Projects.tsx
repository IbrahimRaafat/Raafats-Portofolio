import React, { useState, useEffect, useRef } from 'react'

interface Project {
  id: number
  company: string
  tags: string[]
  image?: string
}

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const projects: Project[] = [
    {
      id: 1,
      company: 'Company Name',
      tags: ['Branding'],
      image: '/project1.jpg'
    },
    {
      id: 2,
      company: 'Company Name',
      tags: ['Branding', 'Website'],
      image: '/project2.jpg'
    },
    {
      id: 3,
      company: 'Company Name',
      tags: ['Branding', 'Website'],
      image: '/project3.jpg'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 lg:px-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-12 sm:mb-16">
          My Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`relative bg-white/50 border-2 border-blue-500 rounded-3xl p-6 cursor-pointer min-h-[350px] flex flex-col transition-all duration-700 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Company Name */}
              <div className="mb-4">
                <p className="text-blue-600 text-sm font-medium">
                  For {project.company}
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-2xl mb-6 min-h-[200px]">
                <span className="text-gray-400 text-sm">Project Image</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-4 py-1.5 text-sm border-2 border-blue-500 text-blue-600 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
