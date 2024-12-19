import { Metadata } from 'next'
import DateDifferenceCalculator from './date-difference-calculator'
import { BASE_URL } from '../../utils/config';


export const metadata: Metadata = {
  title: 'Date Difference Calculator',
  description: 'Calculate the exact difference between any two dates with our easy-to-use date difference calculator.',
  openGraph: {
    title: 'Date Difference Calculator',
    description: 'Calculate the exact difference between any two dates with our easy-to-use date difference calculator.',
    url: `${BASE_URL}/tools/date-difference-calculator`,
    type: 'website',
  },
  alternates: {
      canonical: `${BASE_URL}/tools/date-difference-calculator`,
  }
}

export default function DateDifferenceCalculatorPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Date Difference Calculator</h1>
        <DateDifferenceCalculator />
        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
            <p className="text-gray-700">
              Welcome to our Date Difference Calculator! This tool allows you to easily calculate the exact time span between any two dates. Whether you&apos;re planning project timelines, calculating age, or just curious about the time between two events, this calculator provides a quick and accurate solution.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Enter the start date in the &quot;Start Date&quot; field using the date picker or type it manually in YYYY-MM-DD format.</li>
              <li>Enter the end date in the &quot;End Date&quot; field using the date picker or type it manually in YYYY-MM-DD format.</li>
              <li>Click the &quot;Calculate Difference&quot; button.</li>
              <li>The result will appear below the button, showing the difference in years, months, and days.</li>
            </ol>
            <p className="mt-4 text-gray-700">
              Note: The calculator takes into account leap years and varying month lengths for accurate results.
            </p>
          </section>
        </div>
      </div>
    )
  }
  

