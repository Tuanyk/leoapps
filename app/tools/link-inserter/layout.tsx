import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Link Inserter Tool',
  description: 'Insert links into your HTML content easily with our Link Inserter Tool.',
  openGraph: {
    title: 'Link Inserter Tool',
    description: 'Insert links into your HTML content easily with our Link Inserter Tool.',
    url: `${BASE_URL}tools/link-inserter`,
    siteName: 'Leonardo Tool',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/link-inserter`,
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

