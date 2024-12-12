import { Metadata } from 'next'
import AreaConverter from './area-converter'
import { BASE_URL } from '../../utils/config';


export const metadata: Metadata = {
  title: 'Area Converter | Online Area Unit Conversion Tool',
  description: 'Free online area converter tool. Convert between square meters, square kilometers, hectares, acres, square miles, and more. Simple, fast, and accurate area conversions.',
  openGraph: {
    title: 'Area Converter | Online Area Unit Conversion Tool',
    description: 'Free online area converter tool. Convert between square meters, square kilometers, hectares, acres, square miles, and more. Simple, fast, and accurate area conversions.',
    url: `${BASE_URL}/tools/area-converter`,
    type: 'website',
  },
  alternates: {
      canonical: `${BASE_URL}/tools/area-converter`,
  }
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AreaConverter />
    </div>
  )
}
