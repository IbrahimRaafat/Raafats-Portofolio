import React, { useState } from 'react'
import { Play, RotateCcw, Sparkles } from 'lucide-react'
import { MaskReveal } from './Reveal'

const examples = [
  {
    label: 'Greet',
    code: `type User = { name: string; role: string }

function greet(user: User): string {
  return \`Hey \${user.name} — \${user.role} at work 👋\`
}

const me: User = { name: "Ibrahim", role: "Full-Stack Engineer" }
console.log(greet(me))`,
  },
  {
    label: 'Filter',
    code: `const projects = [
  { title: "Maz Mrkt", stack: "Odoo" },
  { title: "Spira", stack: "Next.js" },
  { title: "Kolr", stack: "Shopify" },
]

const nextOnly = projects.filter(p => p.stack === "Next.js")
console.log(nextOnly)`,
  },
  {
    label: 'Async',
    code: `async function fetchStack() {
  const stack = await Promise.resolve(["TS", "Next.js", "Odoo"])
  return stack.join(" → ")
}

fetchStack().then(console.log)`,
  },
]

function runCode(code: string): string {
  const logs: string[] = []
  const origLog = console.log
  // @ts-ignore capture
  console.log = (...args: unknown[]) => {
    logs.push(
      args
        .map((a) => {
          if (typeof a === 'object' && a !== null) return JSON.stringify(a, null, 2)
          return String(a)
        })
        .join(' ')
    )
  }
  try {
    // strip simple type annotations for JS execution
    const js = code
      .replace(/:\s*string(\[\])?/g, '')
      .replace(/:\s*number/g, '')
      .replace(/:\s*boolean/g, '')
      .replace(/type\s+\w+\s*=\s*\{[^}]+\}/g, '')
      .replace(/interface\s+\w+\s*\{[^}]+\}/g, '')
    // eslint-disable-next-line no-new-func
    const fn = new Function(js)
    const result = fn()
    if (result instanceof Promise) {
      result.then((v) => logs.push(String(v))).catch((e) => logs.push('Error: ' + String(e)))
      // for sync display, show pending
      if (logs.length === 0) logs.push('(async — check console)')
    }
  } catch (e) {
    logs.push('Error: ' + (e instanceof Error ? e.message : String(e)))
  } finally {
    console.log = origLog
  }
  return logs.join('\n') || '(no output)'
}

export default function LearnTogether() {
  const [code, setCode] = useState(examples[0].code)
  const [output, setOutput] = useState('→ Hit Run to see output')
  const [activeEx, setActiveEx] = useState(0)

  const handleRun = () => setOutput(runCode(code))
  const handleReset = () => {
    setCode(examples[activeEx].code)
    setOutput('→ Hit Run to see output')
  }

  return (
    <section id="learn" className="relative bg-[var(--paper)] border-y border-black/10 overflow-hidden" aria-labelledby="learn-heading">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left — intro */}
          <div className="lg:col-span-5">
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
              A tiny TypeScript playground — right here on the page. Tweak the code, hit <span className="font-semibold text-gray-900">Run</span>, and see what happens.
              No setup, no tabs. Perfect for quick experiments while we pair or learn.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {examples.map((ex, i) => (
                <button
                  key={ex.label}
                  onClick={() => {
                    setActiveEx(i)
                    setCode(ex.code)
                    setOutput('→ Hit Run to see output')
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${i === activeEx ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
                >
                  {ex.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Tip: try changing a string or adding a console.log
            </p>
          </div>

          {/* Right — playground */}
          <div className="lg:col-span-7">
            <div className="rounded-[20px] border border-black/10 bg-white overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.07)]">
              {/* Window chrome */}
              <div className="h-9 bg-[#0f1115] flex items-center justify-between px-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="ml-3 text-[11px] font-mono text-white/50">playground.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/60 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </button>
                  <button
                    onClick={handleRun}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors"
                  >
                    <Play className="w-3 h-3 fill-white" /> Run
                  </button>
                </div>
              </div>

              {/* Editor */}
              <div className="grid grid-cols-1">
                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                    className="w-full min-h-[260px] bg-[#0f1115] text-[#e6edf3] font-mono text-[13px] leading-6 p-4 pr-4 focus:outline-none resize-y"
                    style={{ tabSize: 2 }}
                    aria-label="TypeScript code editor"
                  />
                </div>
                {/* Output */}
                <div className="border-t border-black/10 bg-[#f7f5f1]">
                  <div className="px-4 py-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-gray-500">Output</span>
                    <span className="text-[11px] font-mono text-gray-400">console.log →</span>
                  </div>
                  <pre className="mx-3 mb-3 rounded-xl bg-white border border-black/10 p-4 font-mono text-xs leading-5 text-gray-800 whitespace-pre-wrap break-words min-h-[72px] max-h-[180px] overflow-auto">
                    {output}
                  </pre>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-gray-500">
              Want to go deeper?{' '}
              <a href="https://www.typescriptlang.org/play" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">
                Open full TS Playground →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
