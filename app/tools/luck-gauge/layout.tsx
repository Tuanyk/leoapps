import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Luck Gauge - Test Your Fortune',
  description: 'Discover your luck level with our interactive Luck Gauge. Watch the needle swing to reveal your fortune in this engaging and beautifully animated tool.',
  openGraph: {
    title: 'Luck Gauge - Test Your Fortune',
    description: 'Discover your luck level with our interactive Luck Gauge. Watch the needle swing to reveal your fortune in this engaging and beautifully animated tool.',
    url: `${BASE_URL}/tools/luck-gauge`,
    siteName: 'Luck Gauge by Leonardo',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/luck-gauge`,
  }
}

export default function LuckGaugeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

