import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const curtainEase = [0.76, 0, 0.24, 1] as const

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const [revealing, setRevealing] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const duration = 1600
    const start = performance.now()

    const tick = (now: number) => {
      const raw = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - raw, 3)
      setCount(Math.floor(eased * 100))
      setProgress(eased)
      if (raw < 1) {
        requestAnimationFrame(tick)
      } else {
        setCount(100)
        setProgress(1)
        setTimeout(() => setRevealing(true), 400)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Top curtain */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0e0e0e]"
        animate={revealing ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.9, ease: curtainEase, delay: 0.15 }}
        onAnimationComplete={() => revealing && onComplete()}
      />

      {/* Bottom curtain */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0e0e0e]"
        animate={revealing ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.9, ease: curtainEase, delay: 0.15 }}
      />

      {/* Center content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        animate={revealing ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Name */}
        <motion.p
          className="text-white/30 text-[10px] tracking-[0.45em] uppercase font-light mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Ibrahim Raafat
        </motion.p>

        {/* Counter */}
        <motion.span
          className="text-[clamp(5rem,14vw,9rem)] font-extralight tabular-nums leading-none text-white tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        >
          {String(count).padStart(2, '0')}
        </motion.span>

        {/* Progress bar */}
        <motion.div
          className="mt-10 w-48 h-px bg-white/10 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-white/60"
            style={{ width: `${progress * 100}%` }}
          />
        </motion.div>

        {/* Percentage label */}
        <motion.p
          className="mt-3 text-white/20 text-[10px] tabular-nums tracking-widest font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {String(count).padStart(2, '0')} / 100
        </motion.p>
      </motion.div>
    </div>
  )
}
