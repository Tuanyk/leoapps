import type { Metadata } from 'next'
import PValueCalculator from './components/PValueCalculator'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'P-value Calculator | Statistical Tools',
  description: 'Calculate p-values for one-tailed and two-tailed tests based on z-scores with our easy-to-use statistical tool.',
  alternates: {
    canonical: `${BASE_URL}/tools/p-value-calculator`,
  },
}

export default function PValueCalculatorPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">P-value Calculator</h1>
      <PValueCalculator />
    </div>
  )
}


