'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RandomNumberGenerator() {
  const [min, setMin] = useState<number>(1)
  const [max, setMax] = useState<number>(100)
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateRandomNumber = () => {
    setError(null)
    if (min > max) {
      setError("Minimum value cannot be greater than maximum value")
      return
    }
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    setResult(randomNumber)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Random Number Generator</CardTitle>
        <CardDescription>Generate a random number within a specified range</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min">Minimum</Label>
              <Input
                id="min"
                type="number"
                value={min}
                onChange={(e) => setMin(Number(e.target.value))}
                aria-describedby="min-description"
              />
              <p id="min-description" className="text-sm text-gray-500">Lowest possible number</p>
            </div>
            <div>
              <Label htmlFor="max">Maximum</Label>
              <Input
                id="max"
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
                aria-describedby="max-description"
              />
              <p id="max-description" className="text-sm text-gray-500">Highest possible number</p>
            </div>
          </div>
          <Button onClick={generateRandomNumber} className="w-full">Generate Random Number</Button>
          {error && <p className="text-red-500" role="alert">{error}</p>}
          {result !== null && (
            <div className="mt-4 text-center" aria-live="polite">
              <h3 className="text-lg font-semibold">Result</h3>
              <p className="text-4xl font-bold text-blue-600">{result}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

