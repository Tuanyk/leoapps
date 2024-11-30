import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';


export const metadata: Metadata = {
  title: 'Text Case Converter',
  description: 'Convert your text to various cases including uppercase, lowercase, sentence case, and more.',
  alternates: {
    canonical: `${BASE_URL}/tools/textcase`,
  },
}

export default function TextCaseConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}

