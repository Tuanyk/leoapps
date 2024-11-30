import type { Metadata } from 'next'
import RandomNumberGenerator from './components/RandomNumberGenerator'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Random Number Generator | Math Tools',
  description: 'Generate random numbers within a specified range with our easy-to-use tool.',
  alternates: {
    canonical: `${BASE_URL}/tools/random-number-generator`,
  },
}

export default function RandomNumberGeneratorPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Random Number Generator</h1>
      <RandomNumberGenerator />
    </div>
  )
}

