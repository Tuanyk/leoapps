import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator | Financial Tools',
  description: 'Easily calculate compound interest and plan your investments to grow your savings over time.',
  alternates: {
    canonical: `${BASE_URL}/tools/compound-interest`,
  },
}

export default function CompoundInterestLayout({
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