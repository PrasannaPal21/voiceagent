"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useAudio } from "@/hooks/use-audio"
import { forwardRef } from "react"

interface AudioButtonProps extends React.ComponentProps<typeof Button> {
  soundType?: "click" | "success" | "error" | "notification"
  enableHoverSound?: boolean
}

export const AudioButton = forwardRef<HTMLButtonElement, AudioButtonProps>(
  ({ children, onClick, onMouseEnter, soundType = "click", enableHoverSound = true, ...props }, ref) => {
    const { playClickSound, playHoverSound, playSuccessSound, playErrorSound, playNotificationSound } = useAudio()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      switch (soundType) {
        case "success":
          playSuccessSound()
          break
        case "error":
          playErrorSound()
          break
        case "notification":
          playNotificationSound()
          break
        default:
          playClickSound()
      }
      onClick?.(e)
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableHoverSound) {
        playHoverSound()
      }
      onMouseEnter?.(e)
    }

    return (
      <Button ref={ref} onClick={handleClick} onMouseEnter={handleMouseEnter} {...props}>
        {children}
      </Button>
    )
  },
)

AudioButton.displayName = "AudioButton"
