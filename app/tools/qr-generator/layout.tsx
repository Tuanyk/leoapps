import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';


export const metadata: Metadata = {
  title: 'QR Code Generator | Create QR Codes for Text, URLs, and More',
  description: 'Generate QR codes quickly and easily for text, URLs, contact information, and more with our free QR Code Generator tool.',
  openGraph: {
    title: 'QR Code Generator | Create QR Codes for Text, URLs, and More',
    description: 'Generate QR codes quickly and easily for text, URLs, contact information, and more with our free QR Code Generator tool.',
    url: `${BASE_URL}/tools/qr-generator`,
    siteName: 'QR Generator by Leonardo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator | Create QR Codes for Text, URLs, and More',
    description: 'Generate QR codes quickly and easily for text, URLs, contact information, and more with our free QR Code Generator tool.',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/qr-generator`,
  }

}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

