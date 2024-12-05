'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DecisionMaker() {
  const [options, setOptions] = useState<string[]>([])
  const [newOption, setNewOption] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [isDeciding, setIsDeciding] = useState(false)
  const [currentOption, setCurrentOption] = useState('')

  const addOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption.trim()])
      setNewOption('')
    }
  }

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const makeDecision = () => {
    if (options.length > 0) {
      setIsDeciding(true)
      setResult(null)
      const decisionTime = 3000 + Math.random() * 2000 // Random time between 3-5 seconds
      const intervalTime = 100 // Change option every 100ms

      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * options.length)
        setCurrentOption(options[randomIndex])
      }, intervalTime)

      setTimeout(() => {
        clearInterval(interval)
        const finalIndex = Math.floor(Math.random() * options.length)
        setResult(options[finalIndex])
        setIsDeciding(false)
      }, decisionTime)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Decision Maker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter an option"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addOption()}
            />
            <Button onClick={addOption}>Add</Button>
          </div>
          <ul className="space-y-2">
            {options.map((option, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{option}</span>
                <Button variant="destructive" size="sm" onClick={() => removeOption(index)}>Remove</Button>
              </li>
            ))}
          </ul>
          <Button 
            className="w-full" 
            onClick={makeDecision} 
            disabled={options.length === 0 || isDeciding}
          >
            {isDeciding ? 'Deciding...' : 'Make Decision'}
          </Button>
          <div className="mt-4 text-center min-h-[80px]">
            {isDeciding && (
              <div className="animate-pulse">
                <h3 className="text-xl font-semibold">Choosing...</h3>
                <p className="text-2xl font-bold text-primary">{currentOption}</p>
              </div>
            )}
            {result && !isDeciding && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-semibold">Result:</h3>
                <p className="text-2xl font-bold text-primary">{result}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

