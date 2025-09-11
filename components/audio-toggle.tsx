"use client"

import { useState, useEffect } from "react"
import { AudioButton } from "@/components/audio-button"
import { Volume2, VolumeX } from "lucide-react"

export function AudioToggle() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("audio-enabled")
    if (saved !== null) {
      setIsAudioEnabled(JSON.parse(saved))
    }
  }, [])

  const toggleAudio = () => {
    const newState = !isAudioEnabled
    setIsAudioEnabled(newState)
    localStorage.setItem("audio-enabled", JSON.stringify(newState))

    // Dispatch custom event to notify audio components
    window.dispatchEvent(new CustomEvent("audioToggle", { detail: { enabled: newState } }))
  }

  return (
    <AudioButton
      variant="ghost"
      size="sm"
      onClick={toggleAudio}
      className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
      title={isAudioEnabled ? "Disable audio feedback" : "Enable audio feedback"}
      enableHoverSound={isAudioEnabled}
      soundType={isAudioEnabled ? "error" : "success"}
    >
      {isAudioEnabled ? <Volume2 className="w-5 h-5 text-blue-600" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
    </AudioButton>
  )
}
