"use client"

export function AnimatedWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-cyan-50/30"></div>

      {/* Subtle floating orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-1/2 left-10 w-80 h-80 bg-gradient-to-br from-cyan-400/8 to-blue-500/8 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 right-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/8 to-pink-500/8 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>
    </div>
  )
}
