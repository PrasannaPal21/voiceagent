"use client"

export function HeroSVG() {
  return (
    <div className="relative w-full h-96 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Gradient */}
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="800" height="400" fill="url(#heroGradient)" />

        {/* Floating Elements */}
        <g className="animate-float">
          <circle cx="150" cy="80" r="4" fill="#3B82F6" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="650" cy="120" r="6" fill="#8B5CF6" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="700" cy="300" r="5" fill="#06B6D4" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Main Phone Icon */}
        <g transform="translate(350, 150)">
          <rect x="0" y="0" width="100" height="160" rx="20" fill="url(#phoneGradient)" className="drop-shadow-lg">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.05;1"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>

          {/* Screen */}
          <rect x="10" y="20" width="80" height="120" rx="10" fill="white" opacity="0.9" />

          {/* Voice Waves */}
          <g transform="translate(50, 80)">
            {[...Array(5)].map((_, i) => (
              <rect key={i} x={i * 8 - 16} y="0" width="4" height="20" rx="2" fill="#06B6D4" opacity="0.7">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  values="1,0.5;1,1.5;1,0.5"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin={`${i * 0.2}s`}
                />
              </rect>
            ))}
          </g>
        </g>

        {/* Connection Lines */}
        <g stroke="url(#waveGradient)" strokeWidth="2" fill="none" opacity="0.6">
          <path d="M100,200 Q200,150 300,180 T500,160">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M600,250 Q650,200 700,220">
            <animate
              attributeName="stroke-dasharray"
              values="0,500;500,0"
              dur="2s"
              repeatCount="indefinite"
              begin="1s"
            />
          </path>
        </g>

        {/* Data Nodes */}
        <g>
          <circle cx="120" cy="200" r="8" fill="#10B981" opacity="0.8">
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="680" cy="250" r="6" fill="#F59E0B" opacity="0.8">
            <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  )
}

export function AnalyticsSVG() {
  return (
    <svg className="w-full h-64" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Chart Background */}
      <rect width="600" height="300" fill="#F8FAFC" rx="12" />

      {/* Grid Lines */}
      <g stroke="#E2E8F0" strokeWidth="1" opacity="0.5">
        {[...Array(6)].map((_, i) => (
          <line key={i} x1="50" y1={50 + i * 40} x2="550" y2={50 + i * 40} />
        ))}
        {[...Array(11)].map((_, i) => (
          <line key={i} x1={50 + i * 50} y1="50" x2={50 + i * 50} y2="250" />
        ))}
      </g>

      {/* Chart Data */}
      <path
        d="M50,200 L100,180 L150,160 L200,140 L250,120 L300,100 L350,110 L400,90 L450,80 L500,70 L550,60"
        stroke="#3B82F6"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Data Points */}
      {[
        { x: 50, y: 200 },
        { x: 100, y: 180 },
        { x: 150, y: 160 },
        { x: 200, y: 140 },
        { x: 250, y: 120 },
        { x: 300, y: 100 },
        { x: 350, y: 110 },
        { x: 400, y: 90 },
        { x: 450, y: 80 },
        { x: 500, y: 70 },
        { x: 550, y: 60 },
      ].map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r="4" fill="#3B82F6" className="drop-shadow-sm">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
        </circle>
      ))}

      {/* Labels */}
      <text x="300" y="280" textAnchor="middle" className="text-sm fill-gray-600">
        Call Volume Over Time
      </text>
    </svg>
  )
}

export function IntegrationSVG() {
  return (
    <svg className="w-full h-80" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nodeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="nodeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="nodeGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Central AI Node */}
      <g transform="translate(400, 200)">
        <circle r="50" fill="url(#nodeGradient1)" className="drop-shadow-lg">
          <animate attributeName="r" values="50;55;50" dur="3s" repeatCount="indefinite" />
        </circle>
        <text y="5" textAnchor="middle" className="text-white font-bold text-lg fill-white">
          AI
        </text>
      </g>

      {/* Integration Nodes */}
      {[
        { x: 200, y: 100, label: "CRM", gradient: "nodeGradient2" },
        { x: 600, y: 100, label: "Email", gradient: "nodeGradient3" },
        { x: 150, y: 300, label: "Calendar", gradient: "nodeGradient2" },
        { x: 650, y: 300, label: "Analytics", gradient: "nodeGradient3" },
      ].map((node, i) => (
        <g key={i} transform={`translate(${node.x}, ${node.y})`}>
          <circle r="30" fill={`url(#${node.gradient})`} className="drop-shadow-md">
            <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
          </circle>
          <text y="5" textAnchor="middle" className="text-white font-semibold text-sm fill-white">
            {node.label}
          </text>
        </g>
      ))}

      {/* Connection Lines */}
      <g stroke="#3B82F6" strokeWidth="3" fill="none" opacity="0.6">
        <line x1="400" y1="200" x2="200" y2="100">
          <animate attributeName="stroke-dasharray" values="0,300;300,0" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="400" y1="200" x2="600" y2="100">
          <animate
            attributeName="stroke-dasharray"
            values="0,300;300,0"
            dur="2s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </line>
        <line x1="400" y1="200" x2="150" y2="300">
          <animate attributeName="stroke-dasharray" values="0,350;350,0" dur="2s" repeatCount="indefinite" begin="1s" />
        </line>
        <line x1="400" y1="200" x2="650" y2="300">
          <animate
            attributeName="stroke-dasharray"
            values="0,350;350,0"
            dur="2s"
            repeatCount="indefinite"
            begin="1.5s"
          />
        </line>
      </g>

      {/* Data Flow Particles */}
      {[...Array(8)].map((_, i) => (
        <circle key={i} r="3" fill="#06B6D4" opacity="0.8">
          <animateMotion dur="4s" repeatCount="indefinite" begin={`${i * 0.5}s`}>
            <path d="M400,200 L200,100 M400,200 L600,100 M400,200 L150,300 M400,200 L650,300" />
          </animateMotion>
        </circle>
      ))}
    </svg>
  )
}

export function VoiceWaveSVG() {
  return (
    <svg className="w-full h-24" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Voice Wave Bars */}
      {[...Array(20)].map((_, i) => (
        <rect key={i} x={i * 20 + 10} y="50" width="8" height="20" rx="4" fill="url(#waveGradient)" opacity="0.7">
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1,0.3;1,1.8;1,0.3"
            dur="1.5s"
            repeatCount="indefinite"
            begin={`${i * 0.1}s`}
          />
        </rect>
      ))}

      {/* Center Indicator */}
      <circle cx="200" cy="50" r="6" fill="#EF4444" opacity="0.8">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
