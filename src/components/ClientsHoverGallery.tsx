import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react'

export type ClientProject = {
  id: string
  title: string
  subtitle: string
  tech: string[]
  year: string
  link: string
  previewImage: string
  previewType: 'screenshot' | 'logo'
  accentColor: string
}

const clientProjects: ClientProject[] = [
  {
    id: 'maz',
    title: 'Maz Mrkt',
    subtitle: 'Odoo 18 ERP, Automated Pipelines & AWS Infrastructure',
    tech: ['Odoo 18', 'AWS EC2', 'CloudFront', 'PostgreSQL'],
    year: '2024 — Present',
    link: '/maz',
    previewImage: '/images/maz-logo.svg',
    previewType: 'logo',
    accentColor: '#3b82f6',
  },
  {
    id: 'spira',
    title: 'Spira',
    subtitle: 'Narrative Womenswear Digital Experience & Storefront',
    tech: ['Next.js', 'Vercel', 'Tailwind CSS', 'Editorial'],
    year: '2026',
    link: '/spira',
    previewImage: '/images/spira-home.png',
    previewType: 'screenshot',
    accentColor: '#5c6f3a',
  },
  {
    id: 'kolr',
    title: 'Kolr Perfumes',
    subtitle: 'Luxury Fragrance E-Commerce & Curated Catalog',
    tech: ['Shopify Liquid', 'Realtime Inventory', 'Tailwind'],
    year: '2024',
    link: '/kolr',
    previewImage: '/images/kolr-home.png',
    previewType: 'screenshot',
    accentColor: '#1f2acc',
  },
  {
    id: 'coins-cloth',
    title: 'Coins & Cloth',
    subtitle: 'Streetwear Apparel Storefront, n8n & Slack Integrations',
    tech: ['Shopify', 'n8n Automations', 'Slack Alerts'],
    year: '2024',
    link: '/coins-cloth',
    previewImage: '/images/coins-cloth-logo.png',
    previewType: 'logo',
    accentColor: '#121212',
  },
]

const modalVariants = {
  initial: { scale: 0, opacity: 0 },
  open: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] as const },
  },
  closed: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.32, 0, 0.67, 0] as const },
  },
}

const ClientsHoverGallery: React.FC = () => {
  const [modalActive, setModalActive] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Spring physics for the floating preview window
  const springConfig = { stiffness: 320, damping: 28, mass: 0.5 }
  const x = useSpring(useMotionValue(0), springConfig)
  const y = useSpring(useMotionValue(0), springConfig)

  // Trailing spring for the "View" cursor circle
  const badgeSpringConfig = { stiffness: 220, damping: 22, mass: 0.7 }
  const badgeX = useSpring(useMotionValue(0), badgeSpringConfig)
  const badgeY = useSpring(useMotionValue(0), badgeSpringConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX)
    y.set(e.clientY)
    badgeX.set(e.clientX)
    badgeY.set(e.clientY)
  }

  const handleMouseEnterRow = (index: number) => {
    setActiveIndex(index)
    setModalActive(true)
  }

  const handleMouseLeaveList = () => {
    setModalActive(false)
  }

  return (
    <section
      id="clients"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#f1f1f1] py-16 md:py-24 border-y border-gray-200"
      aria-labelledby="clients-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Selected Works &amp; Commercial Systems</span>
            </div>
            <h2
              id="clients-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight"
            >
              Clients &amp; Projects
            </h2>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm hidden md:block italic">
            Hover over any project to inspect live homepage preview →
          </p>
        </div>

        {/* Desktop Interactive Hover Project Rows */}
        <div
          onMouseLeave={handleMouseLeaveList}
          className="divide-y divide-gray-300 border-y border-gray-300"
        >
          {clientProjects.map((project, idx) => {
            const isHovered = modalActive && activeIndex === idx
            return (
              <Link
                key={project.id}
                href={project.link}
                onMouseEnter={() => handleMouseEnterRow(idx)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-10 md:py-12 px-2 sm:px-4 transition-all duration-300 hover:px-6 cursor-pointer"
              >
                {/* Background hover highlight slide */}
                <div className="absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none -z-10" />

                {/* Left: Index & Title */}
                <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                  <span className="font-mono text-xs sm:text-sm text-gray-400 font-semibold group-hover:text-blue-600 transition-colors shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1.5 line-clamp-1 group-hover:text-gray-700 transition-colors">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right: Tech Stack Pills & Arrow */}
                <div className="flex items-center gap-4 sm:gap-6 mt-4 md:mt-0 self-start md:self-auto">
                  <div className="hidden lg:flex items-center gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-600 group-hover:border-blue-200 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs sm:text-sm font-semibold text-gray-400 group-hover:text-gray-900 transition-colors whitespace-nowrap">
                    {project.year}
                  </span>

                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-gray-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-300 text-gray-700 shrink-0">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile Inline Screenshots Cards (Shown on mobile when hover isn't available) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 md:hidden">
          {clientProjects.map((p) => (
            <Link
              key={`mobile-${p.id}`}
              href={p.link}
              className="rounded-2xl border border-gray-200/90 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div
                className={`h-48 relative overflow-hidden border-b border-gray-100 flex items-center justify-center ${
                  p.previewType === 'logo' ? 'bg-white p-8' : 'bg-gray-100'
                }`}
              >
                <img
                  src={p.previewImage}
                  alt={`${p.title} preview`}
                  className={
                    p.previewType === 'logo'
                      ? 'max-h-full max-w-[80%] object-contain group-hover:scale-105 transition-transform duration-500'
                      : 'w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500'
                  }
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-1">
                    <span>{p.year}</span>
                    <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                      View Project <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {p.subtitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* THE FAMOUS FLOATING CURSOR SCREENSHOT MODAL (Desktop Only)       */}
      {/* ============================================================== */}
      <motion.div
        style={{ x, y }}
        variants={modalVariants}
        initial="initial"
        animate={modalActive ? 'open' : 'closed'}
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-[380px] h-[240px] lg:w-[460px] lg:h-[290px] xl:w-[500px] xl:h-[315px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800/10 bg-gray-900 flex flex-col">
          {/* Simulated Browser Chrome Bar */}
          <div className="h-7 bg-[#1c1c1f] px-3.5 flex items-center gap-1.5 border-b border-white/10 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="ml-2 text-[10px] text-gray-400 font-mono truncate">
              {clientProjects[activeIndex]?.title.toLowerCase().replace(/\s+/g, '')}.com
            </span>
          </div>

          {/* Sliding Preview Viewport */}
          <div className="relative w-full flex-1 overflow-hidden bg-black">
            <div
              className="w-full h-full flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{ transform: `translateY(-${activeIndex * 100}%)` }}
            >
              {clientProjects.map((project) => (
                <div
                  key={`modal-${project.id}`}
                  className={`w-full h-full shrink-0 relative flex items-center justify-center ${
                    project.previewType === 'logo'
                      ? 'bg-white p-10 sm:p-12'
                      : 'bg-[#121212]'
                  }`}
                >
                  <img
                    src={project.previewImage}
                    alt={`${project.title} preview`}
                    className={
                      project.previewType === 'logo'
                        ? 'max-h-[85%] max-w-[85%] w-auto h-auto object-contain filter drop-shadow-sm'
                        : 'w-full h-full object-cover object-top'
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Circular "View" Cursor Follower Badge */}
      <motion.div
        style={{ x: badgeX, y: badgeY }}
        variants={modalVariants}
        initial="initial"
        animate={modalActive ? 'open' : 'closed'}
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-blue-600 text-white font-bold text-xs uppercase tracking-wider items-center justify-center shadow-xl shadow-blue-600/30 backdrop-blur-sm"
      >
        <span className="flex items-center gap-1">
          View <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </motion.div>
    </section>
  )
}

export default ClientsHoverGallery
