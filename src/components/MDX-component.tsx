import React from 'react'
import type { MDXComponents } from 'mdx/types'

// Basic mapping of MDX components. Add overrides here (e.g. Image, a, h1)
const components: MDXComponents = {
    // Example: render paragraphs with Tailwind classes
    p: (props: any) => <p className="leading-7 text-gray-700" {...props} />,
    a: (props: any) => <a className="text-blue-600 underline" {...props} />,
}

export const useMDXComponents = (overrides?: MDXComponents): MDXComponents => {
    return { ...(components as object) as MDXComponents, ...(overrides || {}) }
}

export default useMDXComponents