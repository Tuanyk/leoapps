import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beautiful Countdown Clock',
  description: 'A beautiful countdown clock to track time until a target date',
}

export default function CountdownClockLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}

