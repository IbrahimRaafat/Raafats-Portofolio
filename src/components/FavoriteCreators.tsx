import React from 'react'
import { ArrowUpRight, Youtube, GraduationCap, Server } from 'lucide-react'
import { MaskReveal } from './Reveal'

type Creator = {
  name: string
  handle: string
  channelUrl: string
  contentTitle: string
  contentUrl: string
  description: string
  thumbnail: string
  icon: React.ReactNode
  tag: string
}

const creators: Creator[] = [
  {
    name: 'Ahmed Farghal',
    handle: '@asoli_dev',
    channelUrl: 'https://www.youtube.com/@asoli_dev',
    contentTitle: 'Distributed Systems بالعربي',
    contentUrl: 'https://www.youtube.com/watch?v=s_p3I5CMGJw&list=PLald6EODoOJW3alE1oPAkGF0bHZkPIeTK',
    description: 'Clear, Arabic-first deep dive into distributed systems — from consensus to real-world patterns. My go-to when I want to actually understand the why.',
    thumbnail: 'https://img.youtube.com/vi/s_p3I5CMGJw/hqdefault.jpg',
    icon: <Server className="w-4 h-4" />,
    tag: 'Arabic · Systems',
  },
  {
    name: 'ThePrimeagen',
    handle: '@ThePrimeagen',
    channelUrl: 'https://www.youtube.com/@ThePrimeagen',
    contentTitle: 'The Last Algorithms Course You’ll Need — 1 & 2',
    contentUrl: 'https://master.dev/courses/algorithms/',
    description: 'No fluff, just data structures & algorithms the way they should be taught — practical, fast, and fun. Both parts are worth every minute.',
    thumbnail: 'https://img.youtube.com/vi/tNzcM1YYQos/hqdefault.jpg',
    icon: <GraduationCap className="w-4 h-4" />,
    tag: 'Algorithms',
  },
  {
    name: 'Computerphile',
    handle: '@Computerphile',
    channelUrl: 'https://www.youtube.com/@Computerphile',
    contentTitle: 'Building a Web Server in 25 Lines',
    contentUrl: 'https://youtu.be/-5wpm-gesOY?si=7oIlZfg7mIqP8asB',
    description: 'A beautiful 25-line reminder of how the web really works under the hood. Simple code, big ideas.',
    thumbnail: 'https://img.youtube.com/vi/-5wpm-gesOY/hqdefault.jpg',
    icon: <Youtube className="w-4 h-4" />,
    tag: 'Web Fundamentals',
  },
]

export default function FavoriteCreators() {
  return (
    <section id="creators" className="relative bg-[var(--paper)] border-y border-black/10 overflow-hidden" aria-labelledby="creators-heading">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24 relative">
        <div className="max-w-2xl">
          <MaskReveal>
            <p className="text-gray-500 text-[11px] font-mono tracking-[0.18em] uppercase mb-3 flex items-center gap-3">
              <span className="h-px w-6 bg-gray-300" aria-hidden /> 02 — My favorite creators
            </p>
          </MaskReveal>
          <MaskReveal delay={80}>
            <h2 id="creators-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-[0.95]">
              My favorite <span className="font-normal italic" style={{ fontFamily: 'var(--font-display)' }}>creators</span> & their best content
            </h2>
          </MaskReveal>
          <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
            The people I keep coming back to — and the one piece from each I recommend starting with.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {creators.map((c) => (
            <article key={c.name} className="group rounded-[20px] border border-black/10 bg-white overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.06)] flex flex-col hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)] transition-shadow">
              <a href={c.contentUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-video overflow-hidden bg-black">
                <img src={c.thumbnail} alt={`${c.contentTitle} thumbnail`} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur text-gray-800 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-black/10">
                  {c.icon} {c.tag}
                </span>
                <span className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white text-gray-900 flex items-center justify-center shadow">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">{c.name}</h3>
                  <a href={c.channelUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
                    {c.handle} <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <a href={c.contentUrl} target="_blank" rel="noopener noreferrer" className="mt-2 text-[14px] font-semibold leading-snug text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {c.contentTitle}
                </a>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-600 line-clamp-3">{c.description}</p>
                <div className="mt-4">
                  <a href={c.contentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 border border-black/10 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
                    Watch / Learn <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
