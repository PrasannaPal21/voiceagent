"use client"

import { useEffect, useState } from "react"

export function ParticleSystem() {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
    }>
  >([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 4 + 1,
      color: ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981"][Math.floor(Math.random() * 4)],
      opacity: Math.random() * 0.6 + 0.2,
    }))
    setParticles(newParticles)

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight,
          opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.3 + 0.5,
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full transition-all duration-1000"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  )
}

export function MorphingShape() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <path
          fill="url(#morphGradient)"
          d="M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20 Z"
        >
          <animate
            attributeName="d"
            values="M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20 Z;
                    M100,10 C150,30 170,80 160,120 C150,160 120,190 100,180 C80,170 30,150 10,120 C-10,90 30,30 100,10 Z;
                    M100,30 C130,10 170,40 190,80 C210,120 170,160 130,170 C90,180 50,160 30,120 C10,80 50,50 100,30 Z;
                    M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20 Z"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}

export function FloatingElements() {
  const elements = [
    { icon: "📞", delay: 0, duration: 6 },
    { icon: "💬", delay: 1, duration: 8 },
    { icon: "📊", delay: 2, duration: 7 },
    { icon: "🎯", delay: 3, duration: 9 },
    { icon: "⚡", delay: 4, duration: 5 },
    { icon: "🔗", delay: 5, duration: 10 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute text-4xl opacity-20 animate-bounce"
          style={{
            left: `${20 + index * 15}%`,
            top: `${10 + index * 10}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  )
}

export function GlowingOrb({ size = 200, color = "blue" }: { size?: number; color?: string }) {
  const colorMap = {
    blue: "from-blue-400/30 to-cyan-400/30",
    purple: "from-purple-400/30 to-pink-400/30",
    green: "from-green-400/30 to-emerald-400/30",
    orange: "from-orange-400/30 to-red-400/30",
  }

  const [duration, setDuration] = useState("8s")

  useEffect(() => {
    const randomDuration = (6 + Math.random() * 4).toFixed(2)
    setDuration(`${randomDuration}s`)
  }, [])

  return (
    <div
      className={`absolute rounded-full bg-gradient-to-br ${colorMap[color as keyof typeof colorMap]} blur-3xl animate-pulse`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animation: `float ${duration} ease-in-out infinite`,
      }}
    />
  )
}

export function TypewriterText({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className="relative">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export function RippleEffect({ trigger }: { trigger: boolean }) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (trigger) {
      setCounter((prev) => prev + 1)

      const newRipple = {
        id: counter,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }

      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 1000)
    }
  }, [trigger])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute border-2 border-blue-400 rounded-full animate-ping"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            width: "20px",
            height: "20px",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
