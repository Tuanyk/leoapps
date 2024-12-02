'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DiceAnimation from './DiceAnimation'

interface DiceResult {
  value: number;
}

export default function VirtualDiceRoller() {
  const [numberOfDice, setNumberOfDice] = useState<number>(1)
  const [results, setResults] = useState<DiceResult[]>([])
  const [rolling, setRolling] = useState(false)

  const rollDice = () => {
    setRolling(true)
    setResults([])
    setTimeout(() => {
      const newResults = Array.from({ length: numberOfDice }, () => ({
        value: Math.floor(Math.random() * 6) + 1
      }))
      setResults(newResults)
      setRolling(false)
    }, 2000)
  }

  const sum = results.reduce((acc, result) => acc + result.value, 0)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Roll the Dice</CardTitle>
        <CardDescription>Choose the number of 6-sided dice to roll</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Label htmlFor="numberOfDice">Number of Dice</Label>
              <Input
                id="numberOfDice"
                type="number"
                min="1"
                max="10"
                value={numberOfDice}
                onChange={(e) => setNumberOfDice(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                className="w-[100px]"
              />
            </div>
            <Button onClick={rollDice} disabled={rolling} className="mt-6">
              {rolling ? 'Rolling...' : 'Roll'}
            </Button>
          </div>
          <div className="flex justify-center items-center min-h-[150px]">
            {rolling ? (
              <DiceAnimation rolling={rolling} count={numberOfDice} />
            ) : results.length > 0 ? (
              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  {results.map((result, index) => (
                    <div key={index} className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold">
                      {result.value}
                    </div>
                  ))}
                </div>
                <p className="text-xl font-semibold">Sum: {sum}</p>
              </div>
            ) : (
              <p className="text-xl text-gray-500">Roll the dice to see the results</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

