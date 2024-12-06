import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'JSON Validator Tool',
  description: 'Validate and format your JSON data with our easy-to-use online tool.',
  openGraph: {
    title: 'JSON Validator Tool',
    description: 'Validate and format your JSON data with our easy-to-use online tool.',
    url: `${BASE_URL}/tools/json-validator`,
    siteName: 'JSON Validator Tool by Leonardo',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
      canonical: `${BASE_URL}/tools/json-validator`,
    }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="container mx-auto px-4 py-8">
        {children}
        </main>
    </div>
  )
}

