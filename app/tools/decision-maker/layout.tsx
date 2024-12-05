import { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Decision Maker - Random Choice Tool',
  description: 'Make quick decisions with our random choice tool. Enter your options and let our decision maker choose for you!',
  openGraph: {
    title: 'Decision Maker - Random Choice Tool',
    description: 'Make quick decisions with our random choice tool. Enter your options and let our decision maker choose for you!',
    url: `${BASE_URL}/tools/decision-maker`,
    siteName: 'Decision Maker by Leonardo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decision Maker - Random Choice Tool',
    description: 'Make quick decisions with our random choice tool. Enter your options and let our decision maker choose for you!',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/decision-maker`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Decision Maker Tool</h1>
      {children}
      <div className="my-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">How to Use the Decision Maker Tool</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Enter Options:</strong> Type your options one at a time into the input field. Press <strong>Enter</strong> or click the <strong>Add</strong> button to add each option to the list.</li>
          <li><strong>Review Options:</strong> Your options will appear in a list below the input. You can remove any option by clicking the <strong>Remove</strong> button next to it.</li>
          <li><strong>Make a Decision:</strong> Once you’ve added all your options, click the <strong>Make Decision</strong> button to let the tool randomly choose one for you.</li>
          <li><strong>See the Result:</strong> Watch as the tool cycles through options before revealing the final decision.</li>
        </ol>
        <p className="mt-2">Get started by adding your first option below!</p>
      </div>

    </div>
  )
}

