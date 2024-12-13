'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Frown, Meh, Smile } from 'lucide-react'

const rarities = [
  { name: 'Common', chance: 70, color: 'bg-gray-400' },
  { name: 'Rare', chance: 20, color: 'bg-blue-500' },
  { name: 'Epic', chance: 8, color: 'bg-purple-500' },
  { name: 'Legendary', chance: 2, color: 'bg-yellow-500' },
]

export default function LuckEstimator() {
  const [pulls, setPulls] = useState(0)
  const [results, setResults] = useState<string[]>([])
  const [luckScore, setLuckScore] = useState(0)

  const pullGacha = () => {
    const randomNumber = Math.random() * 100
    let cumulativeChance = 0
    let result = ''

    for (const rarity of rarities) {
      cumulativeChance += rarity.chance
      if (randomNumber <= cumulativeChance) {
        result = rarity.name
        break
      }
    }

    setResults(prev => [result, ...prev].slice(0, 10))
    setPulls(prev => prev + 1)
    updateLuckScore(result)
  }

  const updateLuckScore = (result: string) => {
    const scoreMap: { [key: string]: number } = {
      'Common': 1,
      'Rare': 2,
      'Epic': 3,
      'Legendary': 4,
    }
    setLuckScore(prev => {
      const newScore = prev + scoreMap[result]
      return Number((newScore / (pulls + 1)).toFixed(2))
    })
  }

  const getLuckEmoji = () => {
    if (luckScore < 1.5) return <Frown className="w-6 h-6 text-red-500" />
    if (luckScore < 2.5) return <Meh className="w-6 h-6 text-yellow-500" />
    return <Smile className="w-6 h-6 text-green-500" />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Luck Estimator</CardTitle>
          <CardDescription className="text-center">Test your gacha luck!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={pullGacha} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" /> Pull Gacha
            </Button>
            <div className="flex justify-between items-center">
              <span>Pulls: {pulls}</span>
              <div className="flex items-center">
                <span className="mr-2">Luck Score: {luckScore}</span>
                {getLuckEmoji()}
              </div>
            </div>
            <div className="space-y-2">
              {rarities.map((rarity) => (
                <div key={rarity.name} className="flex items-center">
                  <div className="w-24">{rarity.name}</div>
                  <Progress value={rarity.chance} className={`h-2 ${rarity.color}`} />
                  <div className="w-12 text-right">{rarity.chance}%</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Recent Pulls:</h3>
              <div className="flex flex-wrap gap-2">
                {results.map((result, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      result === 'Common' ? 'bg-gray-200 text-gray-800' :
                      result === 'Rare' ? 'bg-blue-200 text-blue-800' :
                      result === 'Epic' ? 'bg-purple-200 text-purple-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {result}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

