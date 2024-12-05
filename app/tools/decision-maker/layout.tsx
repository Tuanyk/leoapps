import { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Decision Maker - Random Choice Tool',
  description: 'Make quick decisions with our random choice tool. Enter your options and let our decision maker choose for you!',
  openGraph: {
    title: 'Decision Maker - Random Choice Tool',
    description: 'Make quick decisions with our random choice tool. Enter your options and let our decision maker choose for you!',
    url: `${BASE_URL}/tools/decision-maker`,
    siteName: 'Decision Maker by Leonardo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decision Maker - Random Choice Tool',
    description: 'Make quick decisions with our random choice tool. Enter your options and let our decision maker choose for you!',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/decision-maker`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Decision Maker Tool</h1>
      {children}
    </div>
  )
}

