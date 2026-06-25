import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const curtainEase = [0.76, 0, 0.24, 1] as const

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0)
  const [revealing, setRevealing] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const duration = 1600
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setCount(100)
        setTimeout(() => setRevealing(true), 350)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Top curtain */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#120F17]"
        animate={revealing ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.9, ease: curtainEase, delay: 0.15 }}
        onAnimationComplete={() => revealing && onComplete()}
      />

      {/* Bottom curtain */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#120F17]"
        animate={revealing ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.9, ease: curtainEase, delay: 0.15 }}
      />

      {/* Center content — sits above both curtains */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none"
        animate={revealing ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          className="text-[clamp(5rem,15vw,10rem)] font-bold tabular-nums leading-none text-blue-500"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          {String(count).padStart(2, '0')}
        </motion.span>

        <motion.p
          className="text-[#f1f1f1]/30 text-xs tracking-[0.5em] uppercase font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Ibrahim Raafat
        </motion.p>
      </motion.div>
    </div>
  )
}
