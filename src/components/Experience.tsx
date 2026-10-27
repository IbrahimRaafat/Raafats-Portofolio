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
    period: 'Jul 2024 — Present',
    bullets: [
      'Deployed Odoo 18 on AWS EC2 + PostgreSQL, CloudFront + ACM — uptime +40%, latency -30%.',
      'Built custom Odoo automations with Python and Odoo ORM, cutting manual workflows by 50%.',
    ],
  },
  {
    company: 'InfoMedia BV',
    location: 'Cairo, Egypt (Remote)',
    role: 'Full Stack Engineer',
    period: 'Jul 2024 — Present',
    bullets: [
      'Developed scalable APIs with Python, Flask, Puppeteer, and BeautifulSoup — automated data throughput +60%.',
      'Created scraping and media pipelines using React, Puppeteer, yt-dlp, and FFmpeg on GCP — reporting time -80%.',
      'Partnered with analysts to ship automated pipelines for real-time insights.',
    ],
  },
  {
    company: 'InfoMedia BV',
    location: 'Cairo, Egypt',
    role: 'Intern Software Engineer',
    period: 'Jan 2023 — May 2023',
    bullets: [
      'Streamlined data pipelines with Python + BeautifulSoup — manual effort -70%.',
      'Improved scraping reliability from 60% to 95% via robust error handling and observability.',
    ],
  },
  {
    company: 'Aschl Management Systems',
    location: 'Schlusslberg, Austria (Remote)',
    role: 'Intern Software Engineer',
    period: 'May 2022 — Oct 2022',
    bullets: [
      'Developed data management interface in WinDev for fast CRUD operations on HFSQL.',
      'Optimized queries and resolved system bugs to improve performance by 20%.',
    ],
  },
]

const Experience = () => {
  const [lineProgress, setLineProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      if (!sectionRef.current) return
      const sec = sectionRef.current
      const total = sec.offsetHeight - window.innerHeight
      const scrolled = window.scrollY - sec.offsetTop
      if (total <= 0) {
        setLineProgress(scrolled > 0 ? 1 : 0)
        return
      }
      const c = Math.min(Math.max(scrolled, 0), total)
      setLineProgress(c / total)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="bg-[#f1f1f1] py-16 md:py-24"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-gray-300 pb-8 mb-12">
          <div>
            <p className="text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
              Work Experience
            </p>
            <h2
              id="experience-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight"
            >
              Building Products, Pipelines &amp; Systems
            </h2>
          </div>
          <a
            href="/resume.pdf"
            download="Ibrahim_Raafat_Resume.pdf"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow shrink-0 self-start sm:self-auto"
          >
            Download Résumé <span aria-hidden>↓</span>
          </a>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Base timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-300" aria-hidden />
          {/* Active animated line */}
          <div
            className="absolute left-[7px] top-2 w-0.5 bg-blue-600 origin-top transition-all duration-75 ease-out"
            style={{ height: `${lineProgress * 100}%` }}
            aria-hidden
          />

          <div className="space-y-8 sm:space-y-10">
            {experiences.map((item) => (
              <article key={`${item.company}-${item.period}`} className="relative pl-8 sm:pl-10">
                {/* Timeline node */}
                <span
                  className="absolute left-0 top-3.5 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center shadow-sm"
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </span>

                {/* Card */}
                <div className="grid grid-cols-12 gap-5 sm:gap-6 rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 leading-snug">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">
                      {item.company} <span className="text-gray-300">·</span> {item.location}
                    </p>
                  </div>
                  <ul className="col-span-12 md:col-span-8 list-disc pl-5 text-sm sm:text-base leading-relaxed text-gray-700 space-y-2.5 marker:text-blue-500">
                    {item.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
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
