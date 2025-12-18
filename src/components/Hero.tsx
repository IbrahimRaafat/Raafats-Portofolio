import React, { useState, useEffect } from 'react'
import CircularText from './CircularText'
import DotGrid from './DotGrid'

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
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 relative">
      {/* DotGrid Background */}
      <div className="absolute inset-0 w-full h-full">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#fcf5eb"
          activeColor="#3b82f6"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-8xl font-normal text-blue-600 leading-tight">
              Welcome
              <br />
              to my{' '}
              <span className="inline-block min-w-[280px] sm:min-w-[400px] md:min-w-[550px] lg:min-w-[600px]">
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
          
          {/* Circular Text - Below text on mobile, right side on desktop */}
          <div className="flex text-blue-600 shrink-0 items-center justify-center">
            <CircularText text="SCROLL DOWN • SCROLL DOWN • " radius={100} fontSize={14} />
          </div>
        </div>  
      </div>
    </section>
  )
}

export default Hero
