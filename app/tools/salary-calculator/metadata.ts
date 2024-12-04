import { Metadata } from 'next'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Salary Calculator | Calculate Your Pay in Multiple Currencies',
  alternates: {
    canonical: `${BASE_URL}/tools/salary-calculator`,
  },
  openGraph: {
    title: 'Salary Calculator | Calculate Your Pay in Multiple Currencies',
    description: 'Free online salary calculator tool to convert your pay rate between hourly, daily, weekly, monthly, and annual amounts in various currencies. Accounts for holidays and vacation days.',
    url: `${BASE_URL}/tools/salary-calculator`,
    type: 'website',
  },
}

