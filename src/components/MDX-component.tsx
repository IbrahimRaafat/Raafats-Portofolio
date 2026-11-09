import React from 'react'
import type { MDXComponents } from 'mdx/types'

interface MDXComponentProps {
  children?: React.ReactNode
  [key: string]: unknown
}

const components: MDXComponents = {
  p: (props: MDXComponentProps) => <p className="leading-7 text-gray-700" {...(props as object)} />,
  a: (props: MDXComponentProps) => <a className="text-blue-600 underline underline-offset-2 hover:text-blue-700" {...(props as object)} />,
  h2: (props: MDXComponentProps) => <h2 className="text-2xl sm:text-[1.7rem] font-bold text-gray-900 tracking-tight mt-10 mb-3" style={{ fontFamily: 'var(--font-display, Georgia), serif' }} {...(props as object)} />,
  h3: (props: MDXComponentProps) => <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-8 mb-2" style={{ fontFamily: 'var(--font-display, Georgia), serif' }} {...(props as object)} />,
  h4: (props: MDXComponentProps) => <h4 className="text-base font-semibold text-gray-800 mt-6 mb-2" {...(props as object)} />,
  blockquote: (props: MDXComponentProps) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...(props as object)} />,
  hr: (props: MDXComponentProps) => <hr className="my-8 border-gray-200" {...(props as object)} />,
  code: (props: MDXComponentProps) => <code className="text-[0.9em] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-800" {...(props as object)} />,
  pre: (props: MDXComponentProps) => <pre className="bg-[#0f172a] text-slate-100 p-4 rounded-xl overflow-x-auto text-sm leading-relaxed my-4" {...(props as object)} />,
}

export const useMDXComponents = (overrides?: MDXComponents): MDXComponents => {
  return { ...(components as object as MDXComponents), ...(overrides || {}) }
}

export default useMDXComponents
