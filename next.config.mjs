/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
    NEXT_PUBLIC_CALL_AGENT_URL: process.env.NEXT_PUBLIC_CALL_AGENT_URL,
  },
  output: 'standalone',

  // ✅ Add this section to proxy HTTP requests
  async rewrites() {
    return [
      {
        source: "/api/:path*", // any request to /api/*
        destination: "http://backend-voiceagent.indominuslabs.in/:path*", // proxy to backend
      },
    ];
  },
}

export default nextConfig
