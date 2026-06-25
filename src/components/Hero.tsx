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

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col items-center justify-center gap-8 lg:gap-8">
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
          <div className="flex text-blue-600 shrink-0 items-center justify-center">
            <CircularText text="SCROLL DOWN • SCROLL DOWN • " radius={80} fontSize={12} />
          </div>
        </div>  
      </div>
    </section>
  )
}

export default Hero
