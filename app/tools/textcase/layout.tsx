import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Case Converter',
  description: 'Convert your text to various cases including uppercase, lowercase, sentence case, and more.',
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

