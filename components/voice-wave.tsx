"use client"

import { useEffect, useState } from "react"

export function VoiceWave() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center space-x-2 h-16">
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-1 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ${
              isActive ? "h-8" : "h-4"
            }`}
            style={{
              animationDelay: `${i * 0.1}s`,
              height: isActive ? `${20 + Math.sin(Date.now() / 1000 + i) * 15}px` : "16px",
            }}
          />
        ))}
      </div>
      <div className="text-cyan-100 text-sm font-medium ml-4">{isActive ? "AI Speaking..." : "Ready to talk"}</div>
    </div>
  )
}
