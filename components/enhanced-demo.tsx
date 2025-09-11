"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AudioButton } from "@/components/audio-button"
import { AudioCard } from "@/components/audio-card"
import { CardContent } from "@/components/ui/card"
import {
  Phone,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Play,
  Pause,
  PhoneCall,
  Settings,
  Calendar,
  Database,
  BarChart3,
  Zap,
  CheckCircle,
  TrendingUp,
  Users,
  Headphones,
  ShoppingCart,
} from "lucide-react"
import { useAudio } from "@/hooks/use-audio"

interface EnhancedDemoProps {
  isOpen: boolean
  onClose: () => void
}

interface DemoScenario {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  messages: Array<{ speaker: string; message: string; delay?: number }>
  integrations: string[]
}

interface Metrics {
  responseTime: number
  confidence: number
  sentiment: number
  accuracy: number
}

const demoScenarios: DemoScenario[] = [
  {
    id: "appointment",
    title: "Appointment Booking",
    description: "AI schedules meetings and manages calendars",
    icon: <Calendar className="w-5 h-5" />,
    messages: [
      { speaker: "AI", message: "Hello! I'm Sarah, your AI assistant. How can I help you today?" },
      { speaker: "User", message: "Hi, I'd like to schedule an appointment for next week." },
      {
        speaker: "AI",
        message: "I'd be happy to help you schedule an appointment. Let me check our availability.",
        delay: 1000,
      },
      {
        speaker: "AI",
        message: "I have openings on Tuesday at 2 PM, Wednesday at 10 AM, or Friday at 3 PM. Which works best?",
        delay: 2000,
      },
      { speaker: "User", message: "Tuesday at 2 PM sounds perfect." },
      {
        speaker: "AI",
        message:
          "Excellent! I've scheduled your appointment for Tuesday at 2 PM. You'll receive a confirmation email shortly.",
        delay: 1500,
      },
    ],
    integrations: ["Calendar", "Email", "CRM"],
  },
  {
    id: "customer-service",
    title: "Customer Support",
    description: "AI handles customer inquiries and support tickets",
    icon: <Headphones className="w-5 h-5" />,
    messages: [
      { speaker: "AI", message: "Thank you for calling customer support. I'm Alex, how can I assist you today?" },
      { speaker: "User", message: "I'm having trouble with my recent order. It hasn't arrived yet." },
      { speaker: "AI", message: "I'm sorry to hear about the delay. Let me look up your order details.", delay: 1000 },
      {
        speaker: "AI",
        message:
          "I found your order #12345. It's currently in transit and should arrive tomorrow. I'll send you tracking info.",
        delay: 2000,
      },
      { speaker: "User", message: "That's great, thank you for checking!" },
      {
        speaker: "AI",
        message: "You're welcome! I've also applied a 10% discount to your next order for the inconvenience.",
        delay: 1000,
      },
    ],
    integrations: ["Order Management", "Email", "Analytics"],
  },
  {
    id: "sales",
    title: "Sales Qualification",
    description: "AI qualifies leads and schedules sales calls",
    icon: <ShoppingCart className="w-5 h-5" />,
    messages: [
      { speaker: "AI", message: "Hi there! I'm Jordan from the sales team. Thanks for your interest in our product!" },
      { speaker: "User", message: "Yes, I'm looking for a solution for my team of 50 people." },
      {
        speaker: "AI",
        message: "Perfect! For a team of 50, I'd recommend our Enterprise plan. What's your main use case?",
        delay: 1000,
      },
      { speaker: "User", message: "We need better project management and team collaboration tools." },
      {
        speaker: "AI",
        message:
          "Excellent! Our Enterprise plan includes advanced project management. Would you like to schedule a demo?",
        delay: 1500,
      },
      { speaker: "User", message: "Yes, that would be great!" },
      {
        speaker: "AI",
        message:
          "I've scheduled a demo for Thursday at 3 PM with our product specialist. You'll receive a calendar invite shortly.",
        delay: 2000,
      },
    ],
    integrations: ["CRM", "Calendar", "Analytics"],
  },
]

export function EnhancedDemo({ isOpen, onClose }: EnhancedDemoProps) {
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario>(demoScenarios[0])
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showCustomization, setShowCustomization] = useState(true)
  const [metrics, setMetrics] = useState<Metrics>({
    responseTime: 0,
    confidence: 0,
    sentiment: 0,
    accuracy: 0,
  })
  const [activeIntegrations, setActiveIntegrations] = useState<string[]>([])

  const { playCallSound, playSuccessSound, playErrorSound, playNotificationSound } = useAudio()

  // Simulate real-time metrics
  useEffect(() => {
    if (isCallActive) {
      const interval = setInterval(() => {
        setMetrics((prev) => ({
          responseTime: Math.max(200, prev.responseTime + (Math.random() - 0.5) * 100),
          confidence: Math.min(100, Math.max(85, prev.confidence + (Math.random() - 0.5) * 10)),
          sentiment: Math.min(100, Math.max(60, prev.sentiment + (Math.random() - 0.5) * 15)),
          accuracy: Math.min(100, Math.max(90, prev.accuracy + (Math.random() - 0.5) * 5)),
        }))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isCallActive])

  useEffect(() => {
    let interval: NodeJS.Timeout
    let messageInterval: NodeJS.Timeout

    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)

      // Initialize metrics
      setMetrics({
        responseTime: 450,
        confidence: 92,
        sentiment: 85,
        accuracy: 96,
      })

      // Simulate conversation
      let messageIndex = 0
      const playMessages = () => {
        if (messageIndex < selectedScenario.messages.length) {
          const message = selectedScenario.messages[messageIndex]

          if (message.speaker === "AI") {
            setIsTyping(true)

            // Trigger integration when AI responds
            if (
              message.message.includes("check") ||
              message.message.includes("schedule") ||
              message.message.includes("look up")
            ) {
              const integration =
                selectedScenario.integrations[Math.floor(Math.random() * selectedScenario.integrations.length)]
              setActiveIntegrations((prev) => [...prev, integration])

              setTimeout(() => {
                setActiveIntegrations((prev) => prev.filter((i) => i !== integration))
              }, 3000)
            }
          }

          setTimeout(
            () => {
              setIsTyping(false)
              setCurrentMessage(messageIndex)
              messageIndex++

              setTimeout(() => {
                playMessages()
              }, message.delay || 3000)
            },
            message.speaker === "AI" ? 1500 : 500,
          )
        }
      }

      setTimeout(playMessages, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isCallActive, selectedScenario])

  if (!isOpen) return null

  const startCall = () => {
    setIsCallActive(true)
    setCurrentMessage(-1)
    setShowCustomization(false)
    setActiveIntegrations([])
    playCallSound()

    setTimeout(() => {
      setIsCallActive(false)
      setCallDuration(0)
      setCurrentMessage(-1)
      setShowCustomization(true)
      setActiveIntegrations([])
      playSuccessSound()
    }, 45000)
  }

  const endCall = () => {
    setIsCallActive(false)
    setCallDuration(0)
    setCurrentMessage(-1)
    setShowCustomization(true)
    setActiveIntegrations([])
    playErrorSound()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <AudioCard
        className="relative w-full max-w-6xl mx-4 bg-white shadow-2xl animate-slideUp rounded-2xl overflow-hidden"
        enableHoverSound={false}
      >
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">AI Voice Demo Studio</h3>
                <p className="text-blue-100 text-sm">Experience real-time AI conversations with live metrics</p>
              </div>
            </div>
            <AudioButton
              variant="ghost"
              size="sm"
              onClick={onClose}
              soundType="error"
              className="text-white hover:bg-white/20 rounded-xl"
            >
              <X className="w-5 h-5" />
            </AudioButton>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 p-6">
            {/* Left Panel - Customization & Metrics */}
            <div className="space-y-6">
              {/* Scenario Selection */}
              {showCustomization && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Settings className="w-5 h-5" />
                    <h4 className="font-semibold">Choose Scenario</h4>
                  </div>
                  <div className="space-y-3">
                    {demoScenarios.map((scenario) => (
                      <AudioCard
                        key={scenario.id}
                        className={`p-4 cursor-pointer transition-all border-2 hover:scale-105 ${
                          selectedScenario.id === scenario.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedScenario(scenario)}
                        enableClickSound={true}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              selectedScenario.id === scenario.id
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {scenario.icon}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{scenario.title}</h5>
                            <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                          </div>
                        </div>
                      </AudioCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Real-time Metrics */}
              {isCallActive && (
                <div className="space-y-4 animate-slideIn">
                  <div className="flex items-center gap-2 text-gray-700">
                    <BarChart3 className="w-5 h-5" />
                    <h4 className="font-semibold">Live Metrics</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Response Time</span>
                      </div>
                      <div className="text-2xl font-bold text-green-700">{Math.round(metrics.responseTime)}ms</div>
                      <div className="text-xs text-green-600">Ultra-fast</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Confidence</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-700">{Math.round(metrics.confidence)}%</div>
                      <div className="text-xs text-blue-600">Excellent</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Sentiment</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-700">{Math.round(metrics.sentiment)}%</div>
                      <div className="text-xs text-purple-600">Positive</div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-800">Accuracy</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-700">{Math.round(metrics.accuracy)}%</div>
                      <div className="text-xs text-orange-600">High</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Integration Showcase */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Database className="w-5 h-5" />
                  <h4 className="font-semibold">Active Integrations</h4>
                </div>

                <div className="space-y-2">
                  {selectedScenario.integrations.map((integration, index) => (
                    <div
                      key={integration}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        activeIntegrations.includes(integration)
                          ? "border-green-300 bg-green-50 animate-pulse"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activeIntegrations.includes(integration) ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          activeIntegrations.includes(integration) ? "text-green-800" : "text-gray-600"
                        }`}
                      >
                        {integration}
                      </span>
                      {activeIntegrations.includes(integration) && (
                        <span className="text-xs text-green-600 ml-auto">Active</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Panel - Call Interface */}
            <div className="lg:col-span-2">
              {!isCallActive ? (
                <div className="text-center space-y-8 py-12">
                  <div className="relative">
                    <div className="w-40 h-40 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                      <Phone className="w-20 h-20 text-white" />
                    </div>
                    <div className="absolute inset-0 w-40 h-40 mx-auto rounded-full border-4 border-blue-300 animate-ping opacity-30"></div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-3xl font-bold text-gray-900">Ready to Experience AI?</h4>
                    <p className="text-gray-600 max-w-md mx-auto text-lg">
                      Start a simulated call to see how our AI handles {selectedScenario.title.toLowerCase()} with
                      natural language processing and real-time integrations.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <AudioButton
                      onClick={startCall}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl hover:scale-105 transition-all shadow-xl"
                      soundType="success"
                    >
                      <Play className="w-6 h-6 mr-3" />
                      Start {selectedScenario.title} Demo
                    </AudioButton>

                    <p className="text-sm text-gray-500">
                      Demo includes live metrics, real integrations, and natural conversation flow
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Call Status */}
                  <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                        <span className="text-lg font-semibold text-green-800">
                          Call Active - {selectedScenario.title}
                        </span>
                      </div>
                      <span className="text-lg font-mono text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm">
                        {formatTime(callDuration)}
                      </span>
                    </div>

                    {/* Enhanced Voice Indicator */}
                    <div className="flex items-center gap-4">
                      <div className="flex space-x-1">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1.5 bg-gradient-to-t from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-300"
                            style={{
                              height: `${16 + Math.sin(Date.now() / 200 + i) * 12}px`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex-1">
                        <span className="text-green-700 font-medium">AI is processing and responding...</span>
                        <div className="text-sm text-green-600 mt-1">
                          Natural language understanding • Real-time processing • Context awareness
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conversation Display */}
                  <div className="bg-gray-50 rounded-2xl p-6 max-h-80 overflow-y-auto">
                    <div className="space-y-4">
                      {selectedScenario.messages.slice(0, currentMessage + 1).map((msg, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-4 animate-slideIn ${
                            msg.speaker === "AI" ? "" : "flex-row-reverse"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ${
                              msg.speaker === "AI"
                                ? "bg-gradient-to-br from-blue-500 to-purple-600"
                                : "bg-gradient-to-br from-gray-500 to-gray-600"
                            }`}
                          >
                            {msg.speaker === "AI" ? "AI" : "U"}
                          </div>
                          <div
                            className={`rounded-2xl p-4 max-w-sm shadow-sm ${
                              msg.speaker === "AI"
                                ? "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-900"
                                : "bg-white text-gray-900 border border-gray-200"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex items-start gap-4 animate-slideIn">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            AI
                          </div>
                          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-4">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                              <div
                                className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Call Controls */}
                  <div className="flex justify-center gap-4">
                    <AudioButton
                      variant={isMuted ? "default" : "outline"}
                      size="lg"
                      onClick={() => {
                        setIsMuted(!isMuted)
                        playNotificationSound()
                      }}
                      className="flex items-center gap-3 hover:scale-105 transition-all px-6 py-3 rounded-xl"
                      soundType="notification"
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </AudioButton>

                    <AudioButton
                      variant={isSpeakerOn ? "default" : "outline"}
                      size="lg"
                      onClick={() => {
                        setIsSpeakerOn(!isSpeakerOn)
                        playNotificationSound()
                      }}
                      className="flex items-center gap-3 hover:scale-105 transition-all px-6 py-3 rounded-xl"
                      soundType="notification"
                    >
                      {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                      Speaker
                    </AudioButton>

                    <AudioButton
                      onClick={endCall}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:scale-105 transition-all px-8 py-3 rounded-xl shadow-lg"
                      soundType="error"
                    >
                      <Pause className="w-5 h-5 mr-2" />
                      End Demo
                    </AudioButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </AudioCard>
    </div>
  )
}
