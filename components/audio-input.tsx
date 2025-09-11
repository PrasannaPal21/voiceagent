"use client"

import type React from "react"

import { useAudio } from "@/hooks/use-audio"
import { forwardRef } from "react"

interface AudioInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  enableTypingSound?: boolean
}

export const AudioInput = forwardRef<HTMLInputElement, AudioInputProps>(
  ({ onKeyDown, onFocus, enableTypingSound = true, className, ...props }, ref) => {
    const { playTypingSound, playNotificationSound } = useAudio()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (enableTypingSound && e.key.length === 1) {
        playTypingSound()
      }
      onKeyDown?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      playNotificationSound()
      onFocus?.(e)
    }

    return (
      <input
        ref={ref}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className={`transition-all focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    )
  },
)

AudioInput.displayName = "AudioInput"
