import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BMI Calculator',
  description: 'Calculate your Body Mass Index (BMI) with our easy-to-use BMI Calculator. Visualize your BMI category, set weight goals, and understand your health status based on your weight and height.',
}

export default function BMICalculatorLayout({
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

