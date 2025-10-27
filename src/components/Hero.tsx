import React, { useState, useEffect } from 'react'

const Hero = () => {
  const words = ['Portfolio', 'Blog', 'World']
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
        setIsAnimating(false)
      }, 300) // Half of the animation duration for fade out
    }, 3000) // Change word every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center px-4">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 lg:px-24">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-blue-600 leading-tight">
          Welcome to
          <br />
          my{' '}
          <span className="inline-block min-w-[250px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[600px]">
            <span
              className={`inline-block transition-all duration-500 ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              {words[currentWordIndex]}
            </span>
          </span>
        </h1>
      </div>
    </section>
  )
}

export default Hero
