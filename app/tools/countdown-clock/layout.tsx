import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Beautiful Countdown Clock',
  description: 'A beautiful countdown clock to track time until a target date',
  alternates: {
    canonical: `${BASE_URL}/tools/countdown-clock`,
  },
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

