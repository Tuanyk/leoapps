'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LuckGauge from './luck-gauge'

export default function LuckGaugePage() {
  const [, setLuckValue] = useState(0.5)
  const [isAnimating, setIsAnimating] = useState(false)

  const testLuck = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setLuckValue(Math.random())
      setIsAnimating(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Luck Gauge</CardTitle>
          <CardDescription className="text-center">
            Test your luck and watch the needle spin!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <LuckGauge />
          <Button 
            onClick={testLuck}
            className="w-full"
            disabled={isAnimating}
          >
            {isAnimating ? 'Testing Luck...' : 'Test Your Luck'}
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">How to Use the Luck Gauge</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Click the &quot;Test Your Luck&quot; button to start.</li>
            <li>Watch as the needle spins rapidly for 3 seconds.</li>
            <li>The needle will then slow down and settle on your luck level.</li>
            <li>The gauge is divided into four sections from bottom to top:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li className="text-red-500">Unlucky (0-25%)</li>
                <li className="text-orange-500">Neutral (26-50%)</li>
                <li className="text-yellow-500">Lucky (51-75%)</li>
                <li className="text-green-500">Very Lucky (76-100%)</li>
              </ul>
            </li>
            <li>Your luck level will be displayed below the gauge.</li>
            <li>Feel free to test your luck multiple times!</li>
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            <strong>Note:</strong> This tool is for entertainment purposes only. Your actual luck may vary in real-life situations.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

