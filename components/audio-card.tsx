"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { useAudio } from "@/hooks/use-audio"
import { forwardRef } from "react"

interface AudioCardProps extends React.ComponentProps<typeof Card> {
  enableHoverSound?: boolean
  enableClickSound?: boolean
}

export const AudioCard = forwardRef<HTMLDivElement, AudioCardProps>(
  ({ children, onMouseEnter, onClick, enableHoverSound = true, enableClickSound = false, ...props }, ref) => {
    const { playHoverSound, playClickSound } = useAudio()

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (enableHoverSound) {
        playHoverSound()
      }
      onMouseEnter?.(e)
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (enableClickSound) {
        playClickSound()
      }
      onClick?.(e)
    }

    return (
      <Card ref={ref} onMouseEnter={handleMouseEnter} onClick={handleClick} {...props}>
        {children}
      </Card>
    )
  },
)

AudioCard.displayName = "AudioCard"
