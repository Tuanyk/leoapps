import { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Coin Toss Tool | Quick and Fair Decision Making',
  description: 'Use our free online coin toss tool for quick, fair, and random decision making. Perfect for settling debates or making choices.',
  openGraph: {
    title: 'Coin Toss Tool | Quick and Fair Decision Making',
    description: 'Use our free online coin toss tool for quick, fair, and random decision making. Perfect for settling debates or making choices.',
    url: `${BASE_URL}/tools/coin-toss`,
    siteName: 'Coin Toss Tool by Leonardo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coin Toss Tool | Quick and Fair Decision Making',
    description: 'Use our free online coin toss tool for quick, fair, and random decision making. Perfect for settling debates or making choices.',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/coin-toss`,
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="canonical"
        href="/tools/coin-toss"
        key="canonical"
      />
      {children}
    </>
  )
}

