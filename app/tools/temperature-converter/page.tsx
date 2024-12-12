import { Metadata } from 'next'
import TemperatureConverter from './temperature-converter'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Temperature Converter | Online Temperature Unit Conversion Tool',
  description: 'Free online temperature converter tool. Convert between Celsius, Fahrenheit, and Kelvin. Simple, fast, and accurate temperature conversions.',
  openGraph: {
    title: 'Temperature Converter | Online Temperature Unit Conversion Tool',
    description: 'Free online temperature converter tool. Convert between Celsius, Fahrenheit, and Kelvin. Simple, fast, and accurate temperature conversions.',
    url: `${BASE_URL}/tools/temperature-converter`,
    type: 'website',
  },
  alternates: {
      canonical: `${BASE_URL}/tools/temperature-converter`,
  }
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <TemperatureConverter />
    </div>
  )
}

