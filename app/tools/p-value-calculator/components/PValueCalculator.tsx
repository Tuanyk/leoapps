'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

interface PValueResult {
  leftTail: number
  rightTail: number
  center: number
  between: number
  twoTails: number
}

export default function PValueCalculator() {
  const [zScore, setZScore] = useState<string>('')
  const [results, setResults] = useState<PValueResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Standard normal cumulative distribution function
  const normalcdf = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x))
    const d = 0.3989423 * Math.exp(-x * x / 2)
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
    if (x > 0) prob = 1 - prob
    return prob
  }

  const calculatePValues = () => {
    setError(null)
    const z = parseFloat(zScore)
    
    if (isNaN(z)) {
      setError("Please enter a valid number for the z-score")
      return
    }

    const leftTail = normalcdf(z)
    const rightTail = 1 - leftTail
    const center = Math.abs(0.5 - normalcdf(Math.abs(z)))
    const between = 1 - 2 * normalcdf(-Math.abs(z))
    const twoTails = 2 * normalcdf(-Math.abs(z))

    setResults({
      leftTail,
      rightTail,
      center,
      between,
      twoTails
    })
  }

  const clearResults = () => {
    setZScore('')
    setResults(null)
    setError(null)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>P-value Calculator</CardTitle>
        <CardDescription>
          Please provide any one value below to compute p-value from z-score or vice versa for a normal distribution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-[1fr,200px,40px] gap-4 items-center">
            <label htmlFor="z-score" className="font-medium">
              Z-score
            </label>
            <Input
              id="z-score"
              type="number"
              step="0.01"
              value={zScore}
              onChange={(e) => setZScore(e.target.value)}
              placeholder="Enter z-score"
            />
            <div /> {/* Empty div for grid alignment */}
          </div>

          <div className="grid grid-cols-[1fr,200px,40px] gap-4 items-center">
            <label className="font-medium">
              P-value (x{'<'}Z, left tail)
            </label>
            <Input value={results?.leftTail.toFixed(4) || ''} readOnly />
            <div className="w-8 h-8 relative">
              <Image
                src="/p-value-left.png"
                alt="Left tail distribution"
                width={32}
                height={32}
                className="text-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr,200px,40px] gap-4 items-center">
            <label className="font-medium">
              P-value (x{'>'}Z, right tail)
            </label>
            <Input value={results?.rightTail.toFixed(4) || ''} readOnly />
            <div className="w-8 h-8 relative">
              <Image
                src="/p-value-right.png"
                alt="Right tail distribution"
                width={32}
                height={32}
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr,200px,40px] gap-4 items-center">
            <label className="font-medium">
              P-value (0 to Z or Z to 0, from center)
            </label>
            <Input value={results?.center.toFixed(4) || ''} readOnly />
            <div className="w-8 h-8 relative">
              <Image
                src="/p-value-center.png"
                alt="Center distribution"
                width={32}
                height={32}
                className="text-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr,200px,40px] gap-4 items-center">
            <label className="font-medium">
              P-value (-Z{'<'}x{'<'}Z, between)
            </label>
            <Input value={results?.between.toFixed(4) || ''} readOnly />
            <div className="w-8 h-8 relative">
              <Image
                src="/p-value-in.png"
                alt="Between distribution"
                width={32}
                height={32}
                className="text-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr,200px,40px] gap-4 items-center">
            <label className="font-medium">
              P-value (x{'<'}-Z or x{'>'}Z, two tails)
            </label>
            <Input value={results?.twoTails.toFixed(4) || ''} readOnly />
            <div className="w-8 h-8 relative">
              <Image
                src="/p-value-out.png"
                alt="Two tails distribution"
                width={32}
                height={32}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-4 justify-center mt-6">
            <Button
              onClick={calculatePValues}
              className="bg-green-700 hover:bg-green-800 text-white px-8"
            >
              Calculate
            </Button>
            <Button
              onClick={clearResults}
              variant="outline"
              className="bg-gray-200 hover:bg-gray-300 px-8"
            >
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

