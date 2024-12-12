import { Metadata } from 'next'
import VolumeConverter from './volume-converter'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Volume Converter | Online Volume Unit Conversion Tool',
  description: 'Free online volume converter tool. Convert between cubic meters, liters, gallons, and more. Includes both metric and imperial units for comprehensive volume conversions.',
  openGraph: {
    title: 'Volume Converter | Online Volume Unit Conversion Tool',
    description: 'Free online volume converter tool. Convert between cubic meters, liters, gallons, and more. Includes both metric and imperial units for comprehensive volume conversions.',
    url: `${BASE_URL}/tools/volume-converter`,
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/volume-converter`,
  }
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <VolumeConverter />
    </div>
  )
}

