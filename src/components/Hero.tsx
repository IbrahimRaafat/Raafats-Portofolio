import React, { useState, useEffect } from 'react'
import CircularText from './CircularText'
import Grainient from './Grainient'

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
    <section id="hero" className="h-dvh flex items-center justify-center px-4 relative overflow-hidden">
      {/* Grainient Background */}
      <div className="absolute inset-0 w-full h-full">
        <Grainient
          color1="#bdbdbd"
          color2="#4dafd0"
          color3="#a6a6a6"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Atmospheric Bottom Dissolve to #f1f1f1 */}
      <div className="absolute bottom-0 inset-x-0 h-32 md:h-44 bg-gradient-to-b from-transparent via-[#f1f1f1]/60 to-[#f1f1f1] pointer-events-none z-10" />

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 lg:px-24 relative z-20">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
          {/* Subtle Identity Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-xs text-xs sm:text-sm font-medium text-gray-800 animate-fadeIn">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Ibrahim Raafat — Full Stack Engineer</span>
          </div>

          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-normal text-blue-600 leading-tight">
              Welcome
              <br />
              to my{' '}
              <span className="inline-block">
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
          
          {/* Circular Text */}
          <div className="flex text-blue-600 shrink-0 items-center justify-center pt-2">
            <CircularText text="SCROLL DOWN • SCROLL DOWN • " radius={80} fontSize={12} />
          </div>
        </div>  
      </div>
    </section>
  )
}

export default Hero
