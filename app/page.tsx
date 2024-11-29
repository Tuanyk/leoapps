import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Multi-Tool Website</h1>
      <p className="text-xl">Choose a tool to get started:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToolCard href="/tools/slugify" title="Slufigy" description="Slugify String" />
        <ToolCard href="/tools/spin-the-wheel" title="Spin the Wheel" description="Spin random choice" />
        <ToolCard href="/tools/bmi-calculator" title="BMI Calculator" description="BMI Calculator" />
        <ToolCard href="/tools/textcase" title="Textcase Converter" description="Textcase Converter" />
      </div>
    </div>
  )
}

const ToolCard = ({ href, title, description }: { href: string, title: string, description: string }) => (
  <Link href={href} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
    <p className="font-normal text-gray-700">{description}</p>
  </Link>
)

