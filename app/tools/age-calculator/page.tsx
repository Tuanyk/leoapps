import AgeCalculator from './AgeCalculator'
import { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Age Calculator | Calculate Time Between Dates',
  description: 'Calculate the precise age or time interval between two dates in years, months, weeks, days, hours, minutes, and seconds.',
  openGraph: {
    title: 'Age Calculator | Calculate Time Between Dates',
    description: 'Calculate the precise age or time interval between two dates in years, months, weeks, days, hours, minutes, and seconds.',
    url: `${BASE_URL}/tools/age-calculator`,
    siteName: 'Your Site Name',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/age-calculator`,
  },
}

export default function AgeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Age Calculator</h1>
      <AgeCalculator />
    </div>
  )
}

