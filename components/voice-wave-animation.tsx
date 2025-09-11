"use client"

export function VoiceWaveAnimation() {
  return (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-t from-blue-400 to-cyan-300 rounded-full animate-pulse"
          style={{
            width: "4px",
            height: `${Math.random() * 40 + 20}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1.5s",
          }}
        />
      ))}
    </div>
  )
}
