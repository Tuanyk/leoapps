import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Super Interesting Clock By Leonardo',
  description: 'A beautiful clock showing time in 5-minute intervals',
  alternates: {
    canonical: `${BASE_URL}/tools/clock`,
  },
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

