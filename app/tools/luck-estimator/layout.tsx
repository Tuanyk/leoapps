import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';


export const metadata: Metadata = {
  title: 'Luck Estimator - Test Your Gacha Luck',
  description: 'Estimate your luck with our gacha-style game. See how fortunate you are in this fun and interactive tool!',
  openGraph: {
    title: 'Luck Estimator - Test Your Gacha Luck',
    description: 'Estimate your luck with our gacha-style game. See how fortunate you are in this fun and interactive tool!',
    url: `${BASE_URL}/tools/luck-estimator`,
    siteName: 'Your Site Name',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luck Estimator - Test Your Gacha Luck',
    description: 'Estimate your luck with our gacha-style game. See how fortunate you are in this fun and interactive tool!',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/luck-estimator`,
  }
}

export default function LuckEstimatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

