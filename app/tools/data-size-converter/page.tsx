import { Metadata } from 'next'
import DataSizeConverter from './data-size-converter'
import { BASE_URL } from '../../utils/config';


export const metadata: Metadata = {
  title: 'Data Size Converter | Online Storage Unit Conversion Tool',
  description: 'Free online data size converter tool. Convert between bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB), and more. Simple, fast, and accurate digital storage conversions.',
  openGraph: {
    title: 'Data Size Converter | Online Storage Unit Conversion Tool',
    description: 'Free online data size converter tool. Convert between bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB), and more. Simple, fast, and accurate digital storage conversions.',
    url: `${BASE_URL}/tools/data-size-converter`,
    type: 'website',
  },
    alternates: {
        canonical: `${BASE_URL}/tools/data-size-converter`,
    }
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DataSizeConverter />
    </div>
  )
}

