import SlugifyForm from './SlugifyForm'
import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Slugify String Tool | Text Utilities',
  description: 'Convert any string into a URL-friendly slug with this easy-to-use slugify tool.',
  alternates: {
    canonical: `${BASE_URL}/tools/slugify`,
  },
}



export default function SlugifyTool() {
  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Slugify Text Tool</h1>
      <SlugifyForm />
    </main>
  )
}

