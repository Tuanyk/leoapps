import type { Metadata } from 'next'
import GPAPlanningCalculator from './gpa-planning-calculator'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'GPA Planning Calculator | GPA Tools',
  description: 'Plan your future GPA and calculate the grades needed to reach your academic goals.',
  alternates: {
    canonical: `${BASE_URL}/tools/gpa-planning-calculator`,
  },
}

export default function GPAPlanningCalculatorPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">GPA Planning Calculator</h2>
      <GPAPlanningCalculator />
    </section>
  )
}

