import React, { useRef, useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { MaskReveal } from './Reveal'

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
  iframeAllowed?: boolean
}

const clientProjects: ClientProject[] = [
  {
    id: 'coins-cloth',
    title: 'Coins & Cloth',
    subtitle: 'Streetwear Apparel Storefront, n8n & Slack Integrations',
    tech: ['Shopify', 'n8n Automations', 'Slack Alerts'],
    year: '2024',
    link: 'https://coinandcloth.com',
    previewImage: '/images/coins-cloth-home.jpg',
    previewType: 'screenshot',
    accentColor: '#121212',
  },
  {
    id: 'spira',
    title: 'Spira',
    subtitle: 'Narrative Womenswear Digital Experience & Storefront',
    tech: ['Next.js', 'Vercel', 'Tailwind CSS', 'Editorial'],
    year: '2026',
    link: 'https://spirahouse.com',
    previewImage: '/images/spira-home.png',
    previewType: 'screenshot',
    accentColor: '#5c6f3a',
  },
  {
    id: 'xceltra',
    title: 'Xceltra',
    subtitle: 'Industrial Data Networking & M2M Connectivity',
    tech: ['Next.js', 'Industrial IoT', 'M2M'],
    year: '2025',
    link: 'https://xceltra.com',
    previewImage: '/images/xceltra-logo.svg',
    previewType: 'logo',
    accentColor: '#0f172a',
  },
  {
    id: 'agatel',
    title: 'Agatel',
    subtitle: 'Reliable Secure Industrial Networking & Connectivity',
    tech: ['Industrial Networking', 'IIoT', 'Security'],
    year: '2025',
    link: 'https://agatel.co.uk',
    previewImage: '/images/agatel-logo.png',
    previewType: 'logo',
    accentColor: '#f97316',
    iframeAllowed: false,
  },
  {
    id: 'anavera',
    title: 'Anavera',
    subtitle: 'Industrial IoT Platform & Enterprise Automation',
    tech: ['Next.js', 'IoT Platform', 'Automation'],
    year: '2025',
    link: 'https://anavera.co.uk',
    previewImage: '/images/anavera-logo.png',
    previewType: 'logo',
    accentColor: '#0e7490',
  },
  {
    id: 'kolr',
    title: 'Kolr Perfumes',
    subtitle: 'Luxury Fragrance E-Commerce & Curated Catalog',
    tech: ['Shopify Liquid', 'Realtime Inventory', 'Tailwind'],
    year: '2024',
    link: 'https://kolr.store',
    previewImage: '/images/kolr-home.png',
    previewType: 'screenshot',
    accentColor: '#1f2acc',
  },
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
]

const LivePreviewIframe: React.FC<{ url: string; title: string; active: boolean }> = ({
  url,
  title,
  active,
}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!active) setLoaded(false)
  }, [active])

  if (!active) return null

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none bg-white transition-opacity duration-300" style={{ opacity: loaded ? 1 : 0 }}>
      <iframe
        src={url}
        title={`${title} live preview`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        tabIndex={-1}
        aria-hidden="true"
        className="w-[1440px] h-[940px] border-0 origin-top-left scale-[0.306] xl:scale-[0.348] bg-white"
      />
      <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-sm text-white font-mono text-[10px] uppercase tracking-wider px-2.5 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Live
      </span>
    </div>
  )
}

const ClientsHoverGallery: React.FC = () => {
  const pinRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const pin = pinRef.current
    const track = trackRef.current
    if (!pin || !track) return

    const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqlDesktop = window.matchMedia('(min-width: 1024px)')
    if (mqlReduced.matches || !mqlDesktop.matches) return

    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const getScrollAmount = () => track.scrollWidth - window.innerWidth

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setProgress(self.progress)
              const idx = Math.min(
                clientProjects.length - 1,
                Math.floor(self.progress * clientProjects.length + 0.0001)
              )
              setActiveIdx(idx)
            },
          },
        })
        // ensure correct measurement after images load
        const imgs = track.querySelectorAll('img')
        let loaded = 0
        const onLoad = () => {
          loaded++
          if (loaded === imgs.length) ScrollTrigger.refresh()
        }
        imgs.forEach((img) => {
          if ((img as HTMLImageElement).complete) onLoad()
          else img.addEventListener('load', onLoad, { once: true })
        })
      }, pin)
    }

    init()

    const onResize = () => {
      // re-evaluate desktop vs mobile — if switched to mobile, kill pin
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        ctx?.revert()
        setProgress(0)
      }
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      ctx?.revert()
    }
  }, [])

  return (
    <section
      id="clients"
      ref={pinRef}
      className="relative bg-[var(--paper)] border-y border-black/10 overflow-hidden"
      aria-labelledby="clients-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ===== DESKTOP PINNED HORIZONTAL ===== */}
      <div className="hidden lg:flex flex-col h-[100dvh] py-4 xl:py-6 justify-between relative">
        {/* Header row — stays visible while pinned */}
        <div className="max-w-7xl mx-auto w-full px-8 lg:px-16 xl:px-24 pt-2 pb-2 flex items-end justify-between gap-8 shrink-0">
          <div>
            <MaskReveal>
              <p className="text-gray-500 text-[11px] font-mono tracking-[0.18em] uppercase mb-2 flex items-center gap-3">
                <span className="h-px w-6 bg-gray-300" aria-hidden /> 01 — Selected Work
              </p>
            </MaskReveal>
            <MaskReveal delay={80}>
              <h2
                id="clients-heading"
                className="text-3xl xl:text-5xl font-bold text-gray-900 tracking-tight leading-none"
              >
                Clients &amp; Projects
              </h2>
            </MaskReveal>
            <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
              <span className="hidden xl:inline">Scroll down ↓</span>
              <span className="xl:hidden">Scroll ↓</span>
              <span className="text-gray-400">— vertical scroll drives horizontal</span>
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-2 shrink-0">
            <span className="font-mono text-xs text-gray-400">
              {String(activeIdx + 1).padStart(2, '0')} / {String(clientProjects.length).padStart(2, '0')}
            </span>
            <div className="flex gap-1.5">
              {clientProjects.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-8 bg-blue-600' : i < activeIdx ? 'w-4 bg-blue-300' : 'w-4 bg-black/15'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 min-h-0 flex items-center overflow-x-clip">
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform pl-8 lg:pl-16 xl:pl-24 pr-8"
            style={{ width: 'max-content' }}
          >
            {clientProjects.map((project, idx) => {
              const isExternal = project.link.startsWith('http')
              return (
                <a
                  key={`pin-${project.id}`}
                  href={project.link}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId((prev) => (prev === project.id ? null : prev))}
                  className="group relative flex-none w-[440px] xl:w-[500px] rounded-[22px] border border-black/10 bg-white overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.07)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300 flex flex-col"
                >
                  <div
                    className={`h-[clamp(170px,32vh,280px)] relative overflow-hidden border-b border-black/5 flex items-center justify-center ${
                      project.previewType === 'logo' ? 'bg-[#f7f5f1] p-8' : 'bg-[#121212]'
                    }`}
                  >
                    <img
                      src={project.previewImage}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className={
                        project.previewType === 'logo'
                          ? 'max-h-[160px] max-w-[78%] object-contain group-hover:scale-[1.02] transition-transform duration-500'
                          : 'w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500'
                      }
                    />
                    {project.iframeAllowed !== false && (
                      <LivePreviewIframe
                        url={project.link}
                        title={project.title}
                        active={hoveredId === project.id}
                      />
                    )}
                    <span className="absolute top-4 left-4 z-20 bg-blue-600 text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded-full">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl xl:text-2xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{project.subtitle}</p>
                    <div className="mt-3.5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400">View project</span>
                      <span className="h-9 w-9 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
            {/* End spacer card */}
            <div className="flex-none w-[320px] flex flex-col justify-center px-8">
              <p className="font-mono text-xs tracking-widest text-black/30 uppercase">End of selection</p>
              <p className="text-2xl font-bold tracking-tight text-gray-900 mt-2 leading-tight">More work on request →</p>
              <p className="text-sm text-gray-500 mt-2">Keep scrolling to continue</p>
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="max-w-7xl mx-auto w-full px-8 lg:px-16 xl:px-24 mt-3 shrink-0">
          <div className="h-px w-full bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-none" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="flex justify-between mt-2 font-mono text-[10px] tracking-widest text-black/30 uppercase">
            <span>Scroll to explore</span>
            <span className="lg:hidden">Swipe →</span>
            <span className="hidden lg:inline">Keep scrolling ↓ for next section</span>
          </div>
        </div>
      </div>

      {/* ===== TABLET / MOBILE FALLBACK (vertical, no pin) ===== */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-16 md:py-20">
        <div className="mb-10">
          <p className="text-gray-500 text-[11px] font-mono tracking-[0.18em] uppercase mb-3 flex items-center gap-3">
            <span className="h-px w-6 bg-gray-300" aria-hidden /> 01 — Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">Clients &amp; Projects</h2>
        </div>

        {/* Horizontal snap scroll on tablet */}
        <div className="hidden md:flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {clientProjects.map((project, idx) => {
            const isExternal = project.link.startsWith('http')
            return (
              <a
                key={`tab-${project.id}`}
                href={project.link}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group relative flex-none w-[420px] snap-start rounded-[20px] border border-black/10 bg-white overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.07)] flex flex-col"
              >
                <div className={`h-[220px] relative overflow-hidden border-b border-black/5 flex items-center justify-center ${project.previewType === 'logo' ? 'bg-[#f7f5f1] p-8' : 'bg-[#121212]'}`}>
                  <img
                    src={project.previewImage}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className={project.previewType === 'logo' ? 'max-h-[140px] max-w-[78%] object-contain' : 'w-full h-full object-cover object-top'}
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white font-black text-[11px] px-2 py-1 rounded-full">0{idx + 1}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-black tracking-tight text-gray-900">{project.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{project.subtitle}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">View →</span>
                    <span className="h-8 w-8 rounded-full border border-black/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* Mobile cards grid fallback */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
          {clientProjects.map((p, idx) => (
            <a
              key={`mobile-${p.id}`}
              href={p.link}
              target={p.link.startsWith('http') ? '_blank' : undefined}
              rel={p.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="rounded-2xl border border-gray-200/90 bg-white overflow-hidden shadow-sm group flex flex-col"
            >
              <div className={`h-48 relative overflow-hidden border-b border-gray-100 flex items-center justify-center ${p.previewType === 'logo' ? 'bg-[#f7f5f1] p-8' : 'bg-[#121212]'}`}>
                <img
                  src={p.previewImage}
                  alt={`${p.title} preview`}
                  className={p.previewType === 'logo' ? 'max-h-full max-w-[80%] object-contain' : 'w-full h-full object-cover object-top'}
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-full">
                  0{idx + 1}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-1">
                    <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                      View Project <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-300" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">{p.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{p.subtitle}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientsHoverGallery
