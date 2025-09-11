import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'voiceagent',
  description: 'A voice agent for your needs',
  generator: 'voiceagent',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
