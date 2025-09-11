"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Phone, Mic, MicOff, Volume2, VolumeX } from "lucide-react"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  type: "call" | "appointment"
}

export function DemoModal({ isOpen, onClose, type }: DemoModalProps) {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)

  if (!isOpen) return null

  const startCall = () => {
    setIsCallActive(true)
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    // Auto end call after 30 seconds for demo
    setTimeout(() => {
      setIsCallActive(false)
      setCallDuration(0)
      clearInterval(interval)
    }, 30000)
  }

  const endCall = () => {
    setIsCallActive(false)
    setCallDuration(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative w-full max-w-md mx-4 bg-white shadow-2xl">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold">{type === "call" ? "Live Call Demo" : "Appointment Demo"}</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {type === "call" ? (
            <div className="p-6">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">AI Voice Agent</h4>
                <p className="text-gray-600">
                  {isCallActive ? `Call Duration: ${formatTime(callDuration)}` : "Ready to connect"}
                </p>
              </div>

              {isCallActive ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-800">Call Active</span>
                    </div>
                    <p className="text-sm text-green-700">"Hello! I'm your AI assistant. How can I help you today?"</p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      variant={isMuted ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="flex items-center gap-2"
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </Button>
                    <Button
                      variant={isSpeakerOn ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                      className="flex items-center gap-2"
                    >
                      {isSpeakerOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      Speaker
                    </Button>
                  </div>

                  <Button onClick={endCall} className="w-full bg-red-600 hover:bg-red-700 text-white">
                    End Call
                  </Button>
                </div>
              ) : (
                <Button onClick={startCall} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Start Demo Call
                </Button>
              )}
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Appointment Booking Simulation</h4>
                  <p className="text-sm text-blue-800">
                    Watch how our AI handles appointment scheduling with natural conversation.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      AI
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 flex-1">
                      <p className="text-sm">"I'd like to schedule an appointment for next week."</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      U
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3 flex-1">
                      <p className="text-sm">
                        "I have availability on Tuesday at 2 PM or Wednesday at 10 AM. Which works better for you?"
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Try Interactive Demo</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
