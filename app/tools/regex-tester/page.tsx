import { Metadata } from 'next'
import RegexTester from './regex-tester'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Online Regex Tester and Debugger',
  description: 'Test and debug your regular expressions in real-time with support for JavaScript, PHP, and Python. Free online regex tester with syntax highlighting and reference guide.',
  openGraph: {
    title: 'Online Regex Tester and Debugger',
    description: 'Test and debug your regular expressions in real-time with support for JavaScript, PHP, and Python.',
    url: `${BASE_URL}/tools/regex-tester`,
  },
  alternates: {
    canonical: `${BASE_URL}/tools/regex-tester`,
  },
}

export default function Page() {
  return <RegexTester />
}

