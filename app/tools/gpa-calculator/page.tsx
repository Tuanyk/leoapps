import GPACalculator from './gpa-calculator'
import type { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'GPA Calculator | GPA Tools',
  description: 'Calculate your current GPA based on your courses and grades.',
  alternates: {
    canonical: `${BASE_URL}/tools/gpa-calculator`,
  },
}

export default function GPACalculatorPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">GPA Calculator</h2>
      <GPACalculator />
    </section>
  )
}

