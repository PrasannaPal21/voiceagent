"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AudioCard } from "@/components/audio-card"
import { CardContent } from "@/components/ui/card"
import { Calendar, Database, Mail, BarChart3, Zap, CheckCircle, ArrowRight, Globe, Shield, Clock } from "lucide-react"

interface Integration {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  status: "active" | "connecting" | "idle"
  metrics?: {
    requests: number
    latency: number
    success: number
  }
}

export function IntegrationShowcase() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "calendar",
      name: "Calendar (Cal.com)",
      icon: <Calendar className="w-5 h-5" />,
      description: "Real-time scheduling and availability checking",
      status: "idle",
      metrics: { requests: 0, latency: 0, success: 100 },
    },
    {
      id: "crm",
      name: "CRM (Salesforce)",
      icon: <Database className="w-5 h-5" />,
      description: "Customer data and interaction history",
      status: "idle",
      metrics: { requests: 0, latency: 0, success: 100 },
    },
    {
      id: "email",
      name: "Email (SendGrid)",
      icon: <Mail className="w-5 h-5" />,
      description: "Automated email confirmations and follow-ups",
      status: "idle",
      metrics: { requests: 0, latency: 0, success: 100 },
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Real-time conversation insights and metrics",
      status: "active",
      metrics: { requests: 247, latency: 45, success: 98.5 },
    },
  ])

  // Simulate integration activity
  useEffect(() => {
    const interval = setInterval(() => {
      setIntegrations((prev) =>
        prev.map((integration) => {
          if (integration.status === "active") {
            return {
              ...integration,
              metrics: {
                requests: integration.metrics!.requests + Math.floor(Math.random() * 3),
                latency: Math.max(20, integration.metrics!.latency + (Math.random() - 0.5) * 10),
                success: Math.min(100, Math.max(95, integration.metrics!.success + (Math.random() - 0.5) * 2)),
              },
            }
          }
          return integration
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const triggerIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, status: "connecting" as const } : integration,
      ),
    )

    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === id
            ? {
                ...integration,
                status: "active" as const,
                metrics: {
                  requests: Math.floor(Math.random() * 50) + 10,
                  latency: Math.floor(Math.random() * 100) + 50,
                  success: Math.floor(Math.random() * 5) + 95,
                },
              }
            : integration,
        ),
      )
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Live Integration Dashboard</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Watch how our AI seamlessly connects with your existing tools and services in real-time
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <AudioCard
            key={integration.id}
            className={`p-6 transition-all duration-300 border-2 cursor-pointer hover:scale-105 ${
              integration.status === "active"
                ? "border-green-300 bg-green-50 shadow-lg"
                : integration.status === "connecting"
                  ? "border-blue-300 bg-blue-50 shadow-lg animate-pulse"
                  : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => integration.status === "idle" && triggerIntegration(integration.id)}
            enableClickSound={true}
          >
            <CardContent className="p-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      integration.status === "active"
                        ? "bg-green-500 text-white"
                        : integration.status === "connecting"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {integration.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                    integration.status === "active"
                      ? "bg-green-100 text-green-800"
                      : integration.status === "connecting"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {integration.status === "active" && <CheckCircle className="w-3 h-3" />}
                  {integration.status === "connecting" && <Zap className="w-3 h-3 animate-spin" />}
                  {integration.status === "idle" && <Clock className="w-3 h-3" />}
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </div>
              </div>

              {integration.metrics && integration.status === "active" && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-green-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">{integration.metrics.requests}</div>
                    <div className="text-xs text-green-600">Requests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">{Math.round(integration.metrics.latency)}ms</div>
                    <div className="text-xs text-green-600">Latency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">{integration.metrics.success.toFixed(1)}%</div>
                    <div className="text-xs text-green-600">Success</div>
                  </div>
                </div>
              )}

              {integration.status === "idle" && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Click to activate</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </CardContent>
          </AudioCard>
        ))}
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Global Reach</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">99.9%</div>
          <div className="text-sm text-gray-600">Uptime</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-900">Security</span>
          </div>
          <div className="text-2xl font-bold text-green-600">SOC 2</div>
          <div className="text-sm text-gray-600">Compliant</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-gray-900">Performance</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">&lt;500ms</div>
          <div className="text-sm text-gray-600">Response Time</div>
        </div>
      </div>
    </div>
  )
}
