import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
    title: 'Spin the Wheel Tool | Random Picker',
    description: 'Use this spin the wheel tool to randomly select an option from a list, perfect for making decisions or drawing winners.',
    alternates: {
      canonical: `${BASE_URL}/tools/spin-the-wheel`,
    },
  }

  export default function SpinTheWheelLayout({
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
  