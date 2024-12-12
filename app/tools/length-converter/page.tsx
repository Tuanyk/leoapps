import { Metadata } from 'next'
import LengthConverter from './length-converter'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Length Converter | Online Unit Conversion Tool',
  description: 'Free online length converter tool. Convert between meters, kilometers, miles, yards, feet, inches and more. Simple, fast and accurate length conversions.',
  openGraph: {
    title: 'Length Converter | Online Unit Conversion Tool',
    description: 'Free online length converter tool. Convert between meters, kilometers, miles, yards, feet, inches and more. Simple, fast and accurate length conversions.',
    url: `${BASE_URL}/tools/length-converter`,
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/length-converter`,
  }
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <LengthConverter />
    </div>
  )
}

