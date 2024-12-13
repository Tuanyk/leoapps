import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Enhanced Luck Estimator - Animated Luck Tester',
  description: 'Test your luck with our animated bubble-style luck estimator. Watch as your fortune unfolds in real-time!',
  openGraph: {
    title: 'Enhanced Luck Estimator - Animated Luck Tester',
    description: 'Test your luck with our animated bubble-style luck estimator. Watch as your fortune unfolds in real-time!',
    url: `${BASE_URL}/tools/enhanced-luck-estimator`,
    siteName: 'Enhanced Luck Estimator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enhanced Luck Estimator - Animated Luck Tester',
    description: 'Test your luck with our animated bubble-style luck estimator. Watch as your fortune unfolds in real-time!',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/enhanced-luck-estimator`,
  }

}

export default function EnhancedLuckEstimatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

