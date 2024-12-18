import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Leonardo&apos;s Multi-Tool Website</h1>
      <p className="text-xl">Choose a tool to get started:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToolCard href="/tools/slugify" title="Slufigy" description="Slugify String" />
        <ToolCard href="/tools/link-inserter" title="Link Inserter Tool" description="Insert links into your HTML content" />
        <ToolCard href="/tools/spin-the-wheel" title="Spin the Wheel" description="Spin random choice" />
        <ToolCard href="/tools/bmi-calculator" title="BMI Calculator" description="BMI Calculator" />
        <ToolCard href="/tools/textcase" title="Textcase Converter" description="Textcase Converter" />
        <ToolCard href="/tools/clock" title="Super clock" description="Clock 5 minutes interval" />
        <ToolCard href="/tools/countdown-clock" title="Countdown clock" description="Countdown clock when boring" />
        <ToolCard href="/tools/compound-interest" title="Compound Interest Calculator" description="Calculate how your investments can grow with compound interest and regular contributions" />
        <ToolCard href="/tools/gpa-calculator" title="GPA Calculator" description="Calculate GPA" />
        <ToolCard href="/tools/gpa-planning-calculator" title="GPA Planning Calculator" description="Planning the desired GPA" />
        <ToolCard href="/tools/random-number-generator" title="Random Number Generator" description="Random Number Generator" />
        <ToolCard href="/tools/p-value-calculator" title="P-value Calculator" description="P-value Calculator" />
        <ToolCard href="/tools/age-calculator" title="Age Calculator" description="Age Calculator" />
        <ToolCard href="/tools/virtual-dice-roller" title="Virtual Dice Roller" description="Virtual Dice Roller" />
        <ToolCard href="/tools/salary-calculator" title="Salary Calculator" description="Calculate Your Pay" />
        <ToolCard href="/tools/decision-maker" title="Decision Maker" description="Random Choice Tool" />
        <ToolCard href="/tools/coin-toss" title="Coin Toss Tool" description="Quick and Fair Decision Making" />
        <ToolCard href="/tools/qr-generator" title="QR Code Generator" description="Create QR Codes for Text, URLs, and More" />
        <ToolCard href="/tools/regex-tester" title="Online Regex Tester and Debugger" description="Support for JavaScript, PHP, and Python" />
        <ToolCard href="/tools/text-compare" title="Text Diff Tool" description="Compare Two Versions of Text" />
        <ToolCard href="/tools/json-formatter" title="JSON Formatter" description="Online JSON Beautifier Tool" />
        <ToolCard href="/tools/json-validator" title="JSON Validator" description="Online JSON Validator Tool" />
        <ToolCard href="/tools/length-converter" title="Length Converter" description="Online Unit Conversion Tool" />
        <ToolCard href="/tools/data-size-converter" title="Data Size Converter" description="Online Storage Unit Conversion Tool" />
        <ToolCard href="/tools/temperature-converter" title="Temperature Converter" description="Online Temperature Unit Conversion Tool" />
        <ToolCard href="/tools/area-converter" title="Area Converter" description="Online Area Unit Conversion Tool" />
        <ToolCard href="/tools/weight-converter" title="Weight Converter" description="Online Weight and Mass Unit Conversion Tool" />
        <ToolCard href="/tools/volume-converter" title="Volume Converter" description="Online Volume Unit Conversion Tool" />
        <ToolCard href="/tools/luck-estimator" title="Luck Estimator" description="Test Your Gacha Luck" />
        <ToolCard href="/tools/enhanced-luck-estimator" title="Enhanced Luck Estimator" description="Animated Luck Tester" />
        <ToolCard href="/tools/luck-gauge" title="Luck Gauge" description="Test Your Fortune" />
        <ToolCard href="/tools/noughts-and-crosses" title="Noughts and Crosses" description="Tic-Tac-Toe Game" />
        <ToolCard href="/tools/date-difference-calculator" title="Date Difference Calculator" description="Calculate the exact difference between any two dates" />
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

