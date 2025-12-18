import React from 'react'

type Props = {
  active: boolean
  duration?: number
}

const PageTransition: React.FC<Props> = ({ active, duration = 700 }) => {
  const style: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    pointerEvents: active ? 'auto' : 'none',
    opacity: active ? 1 : 0,
    transform: active ? 'scale(1)' : 'scale(0.98)',
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`
  }

  return (
    <div aria-hidden={!active} style={style}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#4f46e5 0%,#8b5cf6 50%,#ec4899 100%)', filter: 'saturate(1.05) blur(0.5px)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 96, height: 96, borderRadius: '9999px', background: 'rgba(255,255,255,0.12)', boxShadow: '0 8px 30px rgba(0,0,0,0.25)' }} />
      </div>
    </div>
  )
}

export default PageTransition
