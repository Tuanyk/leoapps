import { Metadata } from 'next'
import TextDiffTool from './textDiffTool'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Text Diff Tool - Compare Two Versions of Text',
  description: 'Compare two versions of text using various diff algorithms. Choose from John Resig\'s algorithm, Snowtide\'s algorithm, and more.',
  openGraph: {
    title: 'Text Diff Tool - Compare Two Versions of Text',
    description: 'Compare two versions of text using various diff algorithms. Choose from John Resig\'s algorithm, Snowtide\'s algorithm, and more.',
    url: `${BASE_URL}/tools/text-compare`,
    type: 'website',
  },
  alternates: {
      canonical: `${BASE_URL}/tools/text-compare`,
  }
}

export default function TextDiffPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Text Diff Tool</h1>
      <TextDiffTool />
    </div>
  )
}

