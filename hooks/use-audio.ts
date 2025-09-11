"use client"

import { useState, useCallback, useEffect } from "react"

export const useAudio = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)

  useEffect(() => {
    const handleAudioToggle = (e: CustomEvent) => {
      setIsAudioEnabled(e.detail.enabled)
    }

    window.addEventListener("audioToggle", handleAudioToggle as EventListener)

    // Check initial state
    const saved = localStorage.getItem("audio-enabled")
    if (saved !== null) {
      setIsAudioEnabled(JSON.parse(saved))
    }

    return () => {
      window.removeEventListener("audioToggle", handleAudioToggle as EventListener)
    }
  }, [])

  const initAudioContext = useCallback(() => {
    if (audioContext) return audioContext

    try {
      const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(newAudioContext)
      return newAudioContext
    } catch (error) {
      console.warn("Web Audio API not supported")
      return null
    }
  }, [audioContext])

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.1) => {
      if (!isAudioEnabled) return

      const ctx = audioContext || initAudioContext()
      if (!ctx) return

      try {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.type = type
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

        gainNode.gain.setValueAtTime(volume, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.start()
        oscillator.stop(ctx.currentTime + duration)
      } catch (error) {
        console.warn("Audio playback failed:", error)
      }
    },
    [audioContext, initAudioContext, isAudioEnabled],
  )

  const playClickSound = useCallback(() => {
    if (!isAudioEnabled) return
    playTone(800, 0.1, "triangle", 0.05)
  }, [playTone, isAudioEnabled])

  const playHoverSound = useCallback(() => {
    if (!isAudioEnabled) return
    playTone(600, 0.05, "sine", 0.03)
  }, [playTone, isAudioEnabled])

  const playSuccessSound = useCallback(() => {
    if (!isAudioEnabled) return
    // Play a chord: C-E-G
    playTone(523, 0.2, "triangle", 0.08) // C
    setTimeout(() => playTone(659, 0.2, "triangle", 0.08), 50) // E
    setTimeout(() => playTone(784, 0.2, "triangle", 0.08), 100) // G
  }, [playTone, isAudioEnabled])

  const playErrorSound = useCallback(() => {
    if (!isAudioEnabled) return
    playTone(220, 0.3, "sawtooth", 0.08)
  }, [playTone, isAudioEnabled])

  const playNotificationSound = useCallback(() => {
    if (!isAudioEnabled) return
    playTone(880, 0.1, "sine", 0.06)
    setTimeout(() => playTone(1100, 0.1, "sine", 0.06), 120)
  }, [playTone, isAudioEnabled])

  const playCallSound = useCallback(() => {
    if (!isAudioEnabled) return
    // Simulate phone ring
    const ringTone = () => {
      playTone(440, 0.4, "sine", 0.1)
      playTone(480, 0.4, "sine", 0.1)
    }
    ringTone()
    setTimeout(ringTone, 800)
  }, [playTone, isAudioEnabled])

  const playTypingSound = useCallback(() => {
    if (!isAudioEnabled) return
    const frequency = 200 + Math.random() * 100 // Random frequency between 200-300Hz
    playTone(frequency, 0.05, "square", 0.02)
  }, [playTone, isAudioEnabled])

  return {
    playTone,
    playClickSound,
    playHoverSound,
    playSuccessSound,
    playErrorSound,
    playNotificationSound,
    playCallSound,
    playTypingSound,
    initAudioContext,
    isAudioEnabled,
  }
}
