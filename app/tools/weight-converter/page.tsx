import { Metadata } from 'next'
import WeightConverter from './weight-converter'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Weight Converter | Online Weight and Mass Unit Conversion Tool',
  description: 'Free online weight converter tool. Convert between kilograms, grams, pounds, ounces, tons, and more. Simple, fast, and accurate weight conversions.',
  openGraph: {
    title: 'Weight Converter | Online Weight and Mass Unit Conversion Tool',
    description: 'Free online weight converter tool. Convert between kilograms, grams, pounds, ounces, tons, and more. Simple, fast, and accurate weight conversions.',
    url: `${BASE_URL}/tools/weight-converter`,
    type: 'website',
  },
  alternates: {
      canonical: `${BASE_URL}/tools/weight-converter`,
  }
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <WeightConverter />
    </div>
  )
}

