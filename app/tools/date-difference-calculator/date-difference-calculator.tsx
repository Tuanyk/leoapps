'use client'

import { useState } from 'react'
import { differenceInDays, differenceInMonths, differenceInYears, parse } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const calculateDifference = () => {
    try {
      const start = parse(startDate, 'yyyy-MM-dd', new Date())
      const end = parse(endDate, 'yyyy-MM-dd', new Date())

      const years = differenceInYears(end, start)
      const months = differenceInMonths(end, start) % 12
      const days = differenceInDays(end, start) % 30

      setResult(`${years} years, ${months} months, and ${days} days`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setResult('Invalid date format. Please use YYYY-MM-DD.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculate Date Difference</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); calculateDifference(); }} className="space-y-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Calculate Difference</Button>
        </form>
        {result && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Result:</h2>
            <p className="text-lg">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

