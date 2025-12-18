import React, { useEffect, useRef, useState } from 'react'

type ExperienceItem = {
  company: string
  location: string
  role: string
  period: string
  bullets: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'Maz Mrkt',
    location: 'Cairo, Egypt (Remote)',
    role: 'Full Stack Engineer',
    period: 'Jul 2024 - Present',
    bullets: [
      'Deployed and configured Odoo 18 on AWS EC2 with PostgreSQL, adding CloudFront and ACM for SSL/TLS to improve uptime by 40% and reduce latency by 30%.',
      'Built custom Odoo automations with Python and the Odoo ORM, cutting manual workflows by 50%.',
    ],
  },
  {
    company: 'InfoMedia BV',
    location: 'Cairo, Egypt (Remote)',
    role: 'Full Stack Engineer',
    period: 'Jul 2024 - Present',
    bullets: [
      'Developed scalable APIs with Python, Flask, Puppeteer, and Beautiful Soup to raise automated data throughput by 60%.',
      'Created scraping and media pipelines using React, Puppeteer, yt-dlp, and FFmpeg on GCP, reducing reporting time by 80%.',
      'Partnered with analysts and operations to deliver automated pipelines that power real-time insights.',
    ],
  },
  {
    company: 'InfoMedia BV',
    location: 'Cairo, Egypt',
    role: 'Intern Software Engineer',
    period: 'Jan 2023 - May 2023',
    bullets: [
      'Streamlined data acquisition pipelines with Python and Beautiful Soup, reducing manual effort by 70%.',
      'Improved scraping reliability from 60% to 95% through code optimization and error handling.',
    ],
  },
  {
    company: 'Aschl Management Systems',
    location: 'Schlusslberg, Austria (Remote)',
    role: 'Intern Software Engineer',
    period: 'May 2022 - Oct 2022',
    bullets: [
      'Built a data management interface in WinDev for fast CRUD operations on HFSQL.',
      'Optimized HFSQL queries and resolved system bugs to improve performance by 20%.',
      'Supported senior developers in debugging and release preparation to enhance stability.',
    ],
  },
]

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [lineProgress, setLineProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
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

  useEffect(() => {
    let ticking = false

    const updateLineProgress = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const totalScrollable = section.offsetHeight - window.innerHeight
      const scrolled = window.scrollY - section.offsetTop

      if (totalScrollable <= 0) {
        setLineProgress(scrolled > 0 ? 1 : 0)
        return
      }

      const clamped = Math.min(Math.max(scrolled, 0), totalScrollable)
      setLineProgress(clamped / totalScrollable)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        updateLineProgress()
        ticking = false
      })
    }

    updateLineProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateLineProgress)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateLineProgress)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="min-h-screen px-4 py-20 bg-white/50 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col gap-6 sm:gap-4 mb-12">
          <p className="text-blue-500 text-sm sm:text-base font-medium uppercase tracking-[0.2em]">
            Work Experience
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-blue-600 leading-tight">
            Building products, pipelines, and experiences
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl">
            Recent roles across engineering, automation, fabrication, and design, with measurable impact on delivery speed, reliability, and user outcomes.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px" aria-hidden>
            <div className="absolute inset-0 bg-blue-100" />
            <div
              className="absolute left-0 top-0 w-px bg-blue-500 origin-top"
              style={{ height: `${Math.min(Math.max(lineProgress, 0), 1) * 100}%` }}
            />
          </div>
          <div className="space-y-8 sm:space-y-10">
            {experiences.map((item, index) => (
              <article
                key={`${item.company}-${item.period}`}
                className={`relative pl-10 sm:pl-12 pt-2 transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-blue-500 bg-white" aria-hidden />
                <div className="rounded-3xl border-2 border-blue-500 bg-white/70 p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col gap-3 sm:gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl sm:text-3xl font-semibold text-blue-600">{item.role}</h3>
                      <span className="px-3 py-1 text-sm border border-blue-200 text-blue-600 rounded-full bg-blue-50">
                        {item.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-gray-700 text-sm sm:text-base">
                      <span className="font-semibold text-gray-900">{item.company}</span>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span>{item.location}</span>
                    </div>
                    <ul className="list-disc pl-5 text-gray-800 text-base sm:text-lg space-y-2 mt-2">
                      {item.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
