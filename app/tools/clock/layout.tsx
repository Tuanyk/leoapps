import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clock',
  description: 'A beautiful clock showing time in 5-minute intervals',
}

export default function BeautifulClockLayout({
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

