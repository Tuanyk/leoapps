'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { units, convert, type Unit } from './utils'

export default function DataSizeConverter() {
  const [value, setValue] = useState<string>('')
  const [fromUnit, setFromUnit] = useState<Unit>(units[0])
  const [toUnit, setToUnit] = useState<Unit>(units[1])

  const result = value ? convert(parseFloat(value), fromUnit, toUnit).toFixed(8) : '0'

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Data Size Converter</CardTitle>
        <p className="text-muted-foreground">
          Convert between different units of digital storage. Enter a value and select your units below.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fromValue">From:</Label>
            <Input
              id="fromValue"
              type="number"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Select
              value={fromUnit.name}
              onValueChange={(value) => setFromUnit(units.find((u) => u.name === value) || units[0])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.name} value={unit.name}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="toValue">To:</Label>
            <Input
              id="toValue"
              type="text"
              readOnly
              value={result}
            />
            <Select
              value={toUnit.name}
              onValueChange={(value) => setToUnit(units.find((u) => u.name === value) || units[0])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.name} value={unit.name}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

