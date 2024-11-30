'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GPAPlanningCalculator() {
  const [currentGPA, setCurrentGPA] = useState<number | ''>('')
  const [currentCredits, setCurrentCredits] = useState<number | ''>('')
  const [desiredGPA, setDesiredGPA] = useState<number | ''>('')
  const [plannedCredits, setPlannedCredits] = useState<number | ''>('')
  const [result, setResult] = useState<string | null>(null)

  const calculateRequiredGPA = () => {
    if (currentGPA === '' || currentCredits === '' || desiredGPA === '' || plannedCredits === '') {
      setResult('Please fill in all fields.')
      return
    }

    const totalCurrentPoints = Number(currentGPA) * Number(currentCredits)
    const totalCredits = Number(currentCredits) + Number(plannedCredits)
    const totalDesiredPoints = Number(desiredGPA) * totalCredits
    const requiredPoints = totalDesiredPoints - totalCurrentPoints
    const requiredGPA = requiredPoints / Number(plannedCredits)

    if (requiredGPA > 4.0) {
      setResult(`It's not possible to achieve the desired GPA with the given credits. The maximum achievable GPA is ${((totalCurrentPoints + (4.0 * Number(plannedCredits))) / totalCredits).toFixed(2)}.`)
    } else if (requiredGPA < 0) {
      setResult(`You've already achieved higher than your desired GPA. Keep up the good work!`)
    } else {
      setResult(`You need to achieve a GPA of ${requiredGPA.toFixed(2)} in your planned courses to reach your desired GPA.`)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>GPA Planning Calculator</CardTitle>
        <CardDescription>Calculate the GPA needed in future courses to achieve your desired overall GPA.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentGPA">Current GPA</Label>
              <Input
                id="currentGPA"
                type="number"
                min="0"
                max="4"
                step="0.01"
                value={currentGPA}
                onChange={(e) => setCurrentGPA(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g., 3.5"
              />
            </div>
            <div>
              <Label htmlFor="currentCredits">Current Credits Completed</Label>
              <Input
                id="currentCredits"
                type="number"
                min="0"
                step="1"
                value={currentCredits}
                onChange={(e) => setCurrentCredits(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g., 60"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="desiredGPA">Desired GPA</Label>
              <Input
                id="desiredGPA"
                type="number"
                min="0"
                max="4"
                step="0.01"
                value={desiredGPA}
                onChange={(e) => setDesiredGPA(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g., 3.7"
              />
            </div>
            <div>
              <Label htmlFor="plannedCredits">Planned Future Credits</Label>
              <Input
                id="plannedCredits"
                type="number"
                min="0"
                step="1"
                value={plannedCredits}
                onChange={(e) => setPlannedCredits(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g., 30"
              />
            </div>
          </div>
          <Button onClick={calculateRequiredGPA} className="w-full">Calculate Required GPA</Button>
          {result && (
            <div className="mt-4 p-4 bg-secondary text-secondary-foreground rounded-md">
              <p className="text-center">{result}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

