"use client"

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient waves */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3">
                <animate attributeName="stop-opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.4">
                <animate attributeName="stop-opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3">
                <animate attributeName="stop-opacity" values="0.3;0.5;0.3" dur="5s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          <path
            d="M0,400 C320,300 420,500 800,350 C1120,200 1200,400 1440,300 L1440,800 L0,800 Z"
            fill="url(#wave-gradient)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;50,20;0,0"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>
  )
}
