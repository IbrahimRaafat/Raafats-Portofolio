import React from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { MaskReveal } from './Reveal'

const PLAYGROUND_URL = 'https://code.ibrahimraafat.com/'

export default function LearnTogether() {
  return (
    <section id="learn" className="relative bg-[var(--paper)] border-y border-black/10 overflow-hidden" aria-labelledby="learn-heading">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left — intro */}
          <div className="lg:col-span-4">
            <MaskReveal>
              <p className="text-gray-500 text-[11px] font-mono tracking-[0.18em] uppercase mb-3 flex items-center gap-3">
                <span className="h-px w-6 bg-gray-300" aria-hidden /> 01.5 — Learn Together
              </p>
            </MaskReveal>
            <MaskReveal delay={80}>
              <h2 id="learn-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-[0.95]">
                Learn <span className="font-normal italic" style={{ fontFamily: 'var(--font-display)' }}>together</span>
              </h2>
            </MaskReveal>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-600 max-w-md">
              An interactive TypeScript &amp; React playground — right here on the page. Write code, experiment live, and see output in real time.
              No setup, no tabs.
            </p>
            <div className="mt-6">
              <a
                href={PLAYGROUND_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 transition-colors"
              >
                Open code.ibrahimraafat.com <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="mt-6 text-xs text-gray-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Built for quick TypeScript &amp; React experiments
            </p>
          </div>

          {/* Right — embedded playground */}
          <div className="lg:col-span-8">
            <div className="rounded-[20px] border border-black/10 bg-white overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.07)]">
              {/* Window chrome */}
              <div className="h-10 bg-[#0f1115] flex items-center justify-between px-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="ml-3 text-[11px] font-mono text-white/60">code.ibrahimraafat.com</span>
                </div>
                <a
                  href={PLAYGROUND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/70 hover:text-white transition-colors"
                >
                  Full screen <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <iframe
                src={PLAYGROUND_URL}
                title="TS Playground — Learn TypeScript & React"
                loading="lazy"
                className="w-full h-[420px] sm:h-[540px] lg:h-[620px] border-0 bg-[#0f1115]"
                allow="clipboard-read; clipboard-write"
              />
            </div>
            <p className="mt-3 text-center text-xs text-gray-500">
              Want more space?{' '}
              <a href={PLAYGROUND_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">
                Open code.ibrahimraafat.com →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
