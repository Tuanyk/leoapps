import { Metadata } from 'next'
import JsonFormatter from './jsonFormatter'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'JSON Formatter | Online JSON Beautifier Tool',
  description: 'Format and beautify your JSON with our free online JSON formatter tool. Easy to use, instant results.',
  openGraph: {
    title: 'JSON Formatter | Online JSON Beautifier Tool',
    description: 'Format and beautify your JSON with our free online JSON formatter tool. Easy to use, instant results.',
    url: `${BASE_URL}/tools/json-formatter`,
    siteName: 'JSON Formatter by Leonardo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter | Online JSON Beautifier Tool',
    description: 'Format and beautify your JSON with our free online JSON formatter tool. Easy to use, instant results.',
  },
  alternates: {
      canonical: `${BASE_URL}/tools/json-formatter`,
  }
}

export default function JsonFormatterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">JSON Formatter</h1>
      <JsonFormatter />
    </div>
  )
}

