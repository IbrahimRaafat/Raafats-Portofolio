import React, { useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { TrendingUp, ArrowUpRight } from 'lucide-react'


export type Technology = {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'cloud' | 'erp' | 'database'
  categoryLabel: string
  logo: string
  brandColor: string
  summary: string
  productionUse: string
  keyFeatures: string[]
  impact: string
  caseStudy?: {
    name: string
    url: string
  }
  companions: string[]
}

const technologies: Technology[] = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    categoryLabel: 'Frontend & UI',
    logo: '/images/tech/react.svg',
    brandColor: '#61DAFB',
    summary: 'Component Architecture & Interactive UI',
    productionUse:
      'Engineered interactive user interfaces, responsive state workflows, and modular design components across storefronts and administrative dashboards.',
    keyFeatures: ['Hooks & Custom State', 'Component Driven', 'Virtual DOM Optimization'],
    impact: 'Fluid 60 FPS transitions & modular reusability',
    caseStudy: { name: 'Spira Narrative Storefront', url: '/spira' },
    companions: ['nextjs', 'typescript', 'tailwind'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    categoryLabel: 'Frontend & UI',
    logo: '/images/tech/nextjs.svg',
    brandColor: '#000000',
    summary: 'Hybrid SSR/SSG & Edge Performance',
    productionUse:
      'Architected high-speed Next.js web applications, leveraging Server-Side Rendering (SSR), Static Site Generation (SSG), and Turbopack for optimal Core Web Vitals.',
    keyFeatures: ['SSR & Static Generation', 'API Routes & Middleware', 'Image Optimization'],
    impact: 'Sub-second page loads & 100/100 SEO scores',
    caseStudy: { name: 'Spira & Portfolio', url: '/spira' },
    companions: ['react', 'typescript', 'vercel', 'tailwind'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Frontend & UI',
    logo: '/images/tech/typescript.svg',
    brandColor: '#3178C6',
    summary: 'Type-Safe Architecture & Contracts',
    productionUse:
      'Enforced strict end-to-end typing across React/Next.js frontends, API payloads, and database models to eliminate runtime crashes and maintain codebase scalability.',
    keyFeatures: ['Strict Static Typing', 'Generic Interfaces', 'API Contract Validation'],
    impact: 'Zero runtime type exceptions in production',
    companions: ['nextjs', 'react', 'nodejs'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    categoryLabel: 'Backend & APIs',
    logo: '/images/tech/python.svg',
    brandColor: '#3776AB',
    summary: 'Data Pipelines & Automation Engines',
    productionUse:
      'Primary backend language for high-throughput REST APIs, resilient web scrapers, automated data ingestion pipelines, and custom Odoo ORM business automations.',
    keyFeatures: ['Data Extraction & ETL', 'Odoo ORM Logic', 'Multi-threaded Scraping'],
    impact: '+60% data throughput & 80% less manual effort',
    caseStudy: { name: 'Maz Mrkt & InfoMedia Pipelines', url: '/maz' },
    companions: ['flask', 'postgresql', 'puppeteer', 'aws'],
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'cloud',
    categoryLabel: 'Cloud & Infrastructure',
    logo: '/images/tech/aws.svg',
    brandColor: '#FF9900',
    summary: 'Cloud Hosting, Edge CDN & SSL Termination',
    productionUse:
      'Deployed production Odoo 18 instances on AWS EC2, configured CloudFront edge caching, managed ACM automated SSL/TLS certificates, and established VPC security groups.',
    keyFeatures: ['EC2 Compute Instances', 'CloudFront Global CDN', 'ACM SSL / TLS Security'],
    impact: '+40% system uptime & 30% lower latency',
    caseStudy: { name: 'Maz Mrkt Cloud Deployment', url: '/maz' },
    companions: ['odoo', 'postgresql', 'docker', 'linux'],
  },
  {
    id: 'odoo',
    name: 'Odoo 18 / ORM',
    category: 'erp',
    categoryLabel: 'ERP & Business Systems',
    logo: '/images/tech/odoo.svg',
    brandColor: '#714B67',
    summary: 'Enterprise Resource Planning & Automation',
    productionUse:
      'Configured and automated Odoo 18 for enterprise operations. Programmed custom automated workflows with Python and the Odoo ORM, unifying inventory, sales, and billing.',
    keyFeatures: ['Odoo 18 Setup & Hosting', 'Custom ORM Automations', 'PostgreSQL Backend Tuning'],
    impact: 'Cut manual operational workflows by 50%',
    caseStudy: { name: 'Maz Mrkt Odoo System', url: '/maz' },
    companions: ['python', 'aws', 'postgresql'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    categoryLabel: 'Databases & Storage',
    logo: '/images/tech/postgresql.svg',
    brandColor: '#336791',
    summary: 'Relational Database & Query Optimization',
    productionUse:
      'Designed relational schemas, fine-tuned complex queries, and maintained ACID-compliant production databases backing Odoo ERP and high-volume data collection engines.',
    keyFeatures: ['Relational Schema Design', 'Query Indexing & Optimization', 'Automated Backups & Replication'],
    impact: 'Supports millions of records with sub-50ms queries',
    caseStudy: { name: 'Maz Mrkt ERP Backend', url: '/maz' },
    companions: ['python', 'odoo', 'aws'],
  },
  {
    id: 'puppeteer',
    name: 'Puppeteer',
    category: 'backend',
    categoryLabel: 'Backend & APIs',
    logo: '/images/tech/puppeteer.svg',
    brandColor: '#00D8A2',
    summary: 'Headless Chrome & Web Scraping',
    productionUse:
      'Developed automated browser pipelines to scrape, extract, and normalize complex web datasets, featuring retry strategies, anti-bot handling, and dynamic content extraction.',
    keyFeatures: ['Headless Chromium Automation', 'Dynamic DOM Extraction', 'Resilient Error Handling'],
    impact: 'Scraping reliability raised from 60% to 95%',
    caseStudy: { name: 'InfoMedia Data Extraction', url: '/maz' },
    companions: ['python', 'nodejs', 'gcp'],
  },
  {
    id: 'shopify',
    name: 'Shopify / Liquid',
    category: 'erp',
    categoryLabel: 'ERP & Business Systems',
    logo: '/images/tech/shopify.svg',
    brandColor: '#96BF48',
    summary: 'E-Commerce Engineering & Liquid Templates',
    productionUse:
      'Built customized e-commerce storefronts, customized Liquid theme architectures, integrated third-party payment/inventory apps, and optimized cart conversions.',
    keyFeatures: ['Liquid Template Customization', 'Storefront API Integration', 'Checkout & Speed Tuning'],
    impact: 'Powers active consumer retail brands',
    caseStudy: { name: 'Kolr Perfumes & Coins & Cloth', url: '/kolr' },
    companions: ['javascript', 'tailwind', 'html5'],
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'backend',
    categoryLabel: 'Backend & APIs',
    logo: '/images/tech/flask.svg',
    brandColor: '#000000',
    summary: 'Microservice APIs & Middleware',
    productionUse:
      'Built lightweight, ultra-fast Python REST APIs to bridge data pipelines, internal operational dashboards, and webhook consumers.',
    keyFeatures: ['RESTful Endpoint Routing', 'CORS & Auth Middleware', 'Lightweight Microservices'],
    impact: 'High-speed ingestion powering real-time analytics',
    companions: ['python', 'postgresql', 'redis'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Frontend & UI',
    logo: '/images/tech/tailwind.svg',
    brandColor: '#06B6D4',
    summary: 'Modern Utility Styling & Responsive Layouts',
    productionUse:
      'Designed responsive, fluid, pixel-accurate web interfaces across mobile, tablet, and desktop viewports with minimal CSS bundle footprint.',
    keyFeatures: ['Mobile-First Layouts', 'Custom Design Tokens', 'Zero Runtime Overhead'],
    impact: 'Rapid prototyping & clean maintainable styles',
    caseStudy: { name: 'Spira & Kolr Portals', url: '/spira' },
    companions: ['react', 'nextjs', 'html5'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    categoryLabel: 'Cloud & Infrastructure',
    logo: '/images/tech/docker.svg',
    brandColor: '#2496ED',
    summary: 'Containerization & Environment Parity',
    productionUse:
      'Containerized Python scraping microservices, Odoo ERP dependencies, and local development environments to ensure exact dev-to-production parity.',
    keyFeatures: ['Multi-Stage Dockerfiles', 'Docker Compose Services', 'Isolated Dependency Runtimes'],
    impact: '100% reproducible builds and zero deployment drift',
    companions: ['aws', 'linux', 'python'],
  },
  {
    id: 'gcp',
    name: 'Google Cloud (GCP)',
    category: 'cloud',
    categoryLabel: 'Cloud & Infrastructure',
    logo: '/images/tech/gcp.svg',
    brandColor: '#4285F4',
    summary: 'Cloud Compute & Media Storage',
    productionUse:
      'Leveraged Google Cloud compute engines and Cloud Storage buckets for running compute-heavy automated media processing, scraping, and transcoding pipelines.',
    keyFeatures: ['Compute Engine VMs', 'Cloud Storage Buckets', 'Automated Scheduled Jobs'],
    impact: 'Reduced scheduled media reporting turnaround by 80%',
    companions: ['ffmpeg', 'python', 'docker'],
  },
  {
    id: 'ffmpeg',
    name: 'FFmpeg',
    category: 'database',
    categoryLabel: 'Databases & Media',
    logo: '/images/tech/ffmpeg.svg',
    brandColor: '#007808',
    summary: 'Audio & Video Media Processing Engine',
    productionUse:
      'Automated batch media encoding, audio extraction, format conversion, and video slicing directly inside cloud pipelines for analytical reporting.',
    keyFeatures: ['Automated Stream Transcoding', 'Audio Track Extraction', 'Optimized File Compression'],
    impact: 'Automated 100s of media conversions per batch',
    companions: ['gcp', 'python'],
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    categoryLabel: 'Databases & Storage',
    logo: '/images/tech/redis.svg',
    brandColor: '#DC382D',
    summary: 'In-Memory Caching & Distributed Queues',
    productionUse:
      'Implemented in-memory caching to accelerate high-frequency API queries and serve as an asynchronous job queue for scraping workers.',
    keyFeatures: ['Sub-Millisecond Read/Write', 'Task Queues & Pub/Sub', 'TTL Cache Invalidation'],
    impact: 'Relieved 70% of redundant database lookups',
    companions: ['python', 'flask', 'postgresql'],
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'cloud',
    categoryLabel: 'Cloud & Infrastructure',
    logo: '/images/tech/git.svg',
    brandColor: '#F05032',
    summary: 'Version Control & Release Workflows',
    productionUse:
      'Maintained clean commit histories, feature branching, merge strategies, and GitHub Actions continuous integration pipelines across all codebases.',
    keyFeatures: ['Branching & PR Workflows', 'CI/CD Pipelines', 'Version Tagging & Releases'],
    impact: 'Streamlined collaboration & zero code regressions',
    companions: ['vercel', 'docker'],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Backend & APIs',
    logo: '/images/tech/nodejs.svg',
    brandColor: '#5FA04E',
    summary: 'Server-Side JavaScript & Tooling',
    productionUse:
      'Ran headless scraping tasks, Next.js server runtime, and build-time automation scripts for high concurrency tasks.',
    keyFeatures: ['Asynchronous Event Loop', 'NPM Package Ecosystem', 'Server-Side JavaScript'],
    impact: 'Fast non-blocking I/O for web workers',
    companions: ['typescript', 'nextjs', 'puppeteer'],
  },
  {
    id: 'linux',
    name: 'Linux / Bash',
    category: 'cloud',
    categoryLabel: 'Cloud & Infrastructure',
    logo: '/images/tech/linux.svg',
    brandColor: '#FCC624',
    summary: 'Server Administration & Shell Automation',
    productionUse:
      'Configured remote Ubuntu servers on AWS/GCP, wrote automated shell scripts, set up cron daemon schedules, managed systemd services, and configured Nginx reverse proxies.',
    keyFeatures: ['Bash Automation Scripts', 'Systemd Service Units', 'Server Hardening & Firewall'],
    impact: 'Autonomous server maintenance and scheduled jobs',
    companions: ['aws', 'docker', 'postgresql'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'cloud',
    categoryLabel: 'Cloud & Infrastructure',
    logo: '/images/tech/vercel.svg',
    brandColor: '#000000',
    summary: 'Global Edge Deployment & Serverless',
    productionUse:
      'Deployed Next.js web applications onto Vercel’s global CDN with preview environments, instant git push deployments, and edge network delivery.',
    keyFeatures: ['Instant Edge Deployment', 'Automatic SSL & DNS', 'Serverless Functions'],
    impact: 'Global sub-100ms response times worldwide',
    caseStudy: { name: 'Spira & Portfolio', url: '/spira' },
    companions: ['nextjs', 'react'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    categoryLabel: 'Frontend & UI',
    logo: '/images/tech/javascript.svg',
    brandColor: '#F7DF1E',
    summary: 'Modern ES6+ Client Engineering',
    productionUse:
      'Authored asynchronous frontend logic, custom animations, DOM manipulation for Shopify themes, and interactive client-side behaviors.',
    keyFeatures: ['ES6+ Syntax & Async/Await', 'Event Driven Architecture', 'DOM & Web APIs'],
    impact: 'Powers rich web interactions & custom storefront modules',
    companions: ['react', 'html5', 'tailwind'],
  },
  {
    id: 'html5',
    name: 'HTML5 & CSS3',
    category: 'frontend',
    categoryLabel: 'Frontend & UI',
    logo: '/images/tech/html5.svg',
    brandColor: '#E34F26',
    summary: 'Semantic Web Architecture & Standards',
    productionUse:
      'Structured semantic, accessible HTML document hierarchies with modern CSS flexbox/grid layouts and CSS variable design systems.',
    keyFeatures: ['Semantic Elements', 'Web Accessibility (ARIA)', 'CSS Variables & Grid'],
    impact: 'Accessible, SEO-friendly structured foundations',
    companions: ['tailwind', 'javascript', 'react'],
  },
]

const marqueeModalVariants = {
  initial: { scale: 0, opacity: 0 },
  open: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] as const },
  },
  closed: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.32, 0, 0.67, 0] as const },
  },
}

const TechStack = () => {
  // State for the floating hover card on the sliding marquee
  const [hoveredMarqueeTech, setHoveredMarqueeTech] = useState<Technology | null>(null)
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false)
  const marqueeContainerRef = useRef<HTMLDivElement>(null)

  // Spring physics for the marquee floating preview
  const springConfig = { stiffness: 320, damping: 28, mass: 0.5 }
  const marqueeX = useSpring(useMotionValue(0), springConfig)
  const marqueeY = useSpring(useMotionValue(0), springConfig)

  const handleMarqueeMouseMove = (e: React.MouseEvent) => {
    marqueeX.set(e.clientX)
    marqueeY.set(e.clientY)
  }

  const handleMouseEnterMarqueeTile = (tech: Technology) => {
    setHoveredMarqueeTech(tech)
    setIsMarqueeHovered(true)
  }

  const handleMouseLeaveMarquee = () => {
    setIsMarqueeHovered(false)
  }

  return (
    <section id="stack" className="bg-[#f1f1f1] py-14 md:py-20 border-t border-gray-200" aria-label="Technology Stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* BIG-ICON SLIDING MARQUEE WITH HOVER PREVIEW (LIKE CLIENTS) */}
        <div
          ref={marqueeContainerRef}
          onMouseMove={handleMarqueeMouseMove}
          onMouseLeave={handleMouseLeaveMarquee}
          className="relative"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
              Full Technology Ecosystem
            </span>
            <span className="text-xs text-gray-400 font-medium hidden sm:inline italic">
              Hover over any icon to inspect production role →
            </span>
          </div>

          <div className="relative w-full overflow-hidden rounded-3xl bg-white/70 border border-gray-200/90 py-6 px-4 shadow-sm backdrop-blur-xs">
            {/* Gradient fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Sliding Track with Large Prominent Icons */}
            <div className="animate-tech-marquee flex items-center gap-6">
              {[...technologies, ...technologies].map((t, idx) => {
                const isHovered = hoveredMarqueeTech?.id === t.id && isMarqueeHovered
                return (
                  <div
                    key={`${t.id}-big-${idx}`}
                    onMouseEnter={() => handleMouseEnterMarqueeTile(t)}
                    className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-300 shrink-0 w-32 sm:w-36 md:w-40 border cursor-pointer ${
                      isHovered
                        ? 'bg-white border-blue-600 shadow-xl scale-105 z-20'
                        : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-2xs hover:shadow-md'
                    }`}
                  >
                    {/* Big Prominent Logo */}
                    <div className="h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={t.logo}
                        alt={`${t.name} logo`}
                        className="w-full h-full object-contain filter drop-shadow-xs"
                        loading="lazy"
                      />
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate max-w-full text-center">
                      {t.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ============================================================== */}
          {/* FLOATING HOVER CARD FOR MARQUEE (SIMILAR TO CLIENTS SECTION)   */}
          {/* ============================================================== */}
          <motion.div
            style={{ x: marqueeX, y: marqueeY }}
            variants={marqueeModalVariants}
            initial="initial"
            animate={isMarqueeHovered && hoveredMarqueeTech ? 'open' : 'closed'}
            className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block -translate-x-1/2 -translate-y-full pb-8"
          >
            {hoveredMarqueeTech && (
              <div className="w-[340px] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-5 flex flex-col text-left">
                {/* Brand color accent line */}
                <div
                  className="h-1.5 -mx-5 -mt-5 mb-4"
                  style={{ backgroundColor: hoveredMarqueeTech.brandColor }}
                />

                {/* Header with Logo & Name */}
                <div className="flex items-center gap-3.5 pb-3 border-b border-gray-100">
                  <div className="h-12 w-12 rounded-xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center shrink-0">
                    <img
                      src={hoveredMarqueeTech.logo}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {hoveredMarqueeTech.categoryLabel}
                    </span>
                    <h4 className="text-lg font-extrabold text-gray-900 mt-0.5">
                      {hoveredMarqueeTech.name}
                    </h4>
                  </div>
                </div>

                {/* What I Did With This Technology */}
                <div className="mt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    What I Did With This Technology
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {hoveredMarqueeTech.productionUse}
                  </p>
                </div>

                {/* Measured Impact Badge */}
                <div className="mt-3 p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/80 text-xs font-semibold text-blue-900 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{hoveredMarqueeTech.impact}</span>
                </div>

                {/* Case study indicator if available */}
                {hoveredMarqueeTech.caseStudy && (
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Featured in Project:</span>
                    <span className="text-blue-600 font-bold flex items-center gap-0.5">
                      {hoveredMarqueeTech.caseStudy.name}
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TechStack
