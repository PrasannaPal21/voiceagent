"use client"

import { Phone, MessageSquare, Calendar, BarChart3, Users, Headphones } from "lucide-react"

export function FloatingIcons() {
  const icons = [
    { Icon: Phone, delay: 0, x: 100, y: 50 },
    { Icon: MessageSquare, delay: 1, x: 200, y: 100 },
    { Icon: Calendar, delay: 2, x: 150, y: 150 },
    { Icon: BarChart3, delay: 3, x: 250, y: 80 },
    { Icon: Users, delay: 4, x: 180, y: 200 },
    { Icon: Headphones, delay: 5, x: 120, y: 120 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute opacity-20 animate-bounce"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            animationDelay: `${delay}s`,
            animationDuration: "3s",
          }}
        >
          <Icon className="w-8 h-8 text-blue-500" />
        </div>
      ))}
    </div>
  )
}
