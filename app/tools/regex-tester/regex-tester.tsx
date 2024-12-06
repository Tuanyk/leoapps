'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"

type Language = 'javascript' | 'php' | 'python'

export default function RegexTester() {
  const [language, setLanguage] = useState<Language>('php')
  const [regex, setRegex] = useState('')
  const [flags, setFlags] = useState('')
  const [testString, setTestString] = useState('')
  const [pregMatchAll, setPregMatchAll] = useState(false)
  const [result, setResult] = useState<string>('')

  const handleTest = () => {
    try {
      if (!regex || !testString) {
        setResult('Please enter both regex and test string')
        return
      }

      let matches
      if (language === 'javascript') {
        const re = new RegExp(regex, flags)
        matches = testString.match(re)
      } else if (language === 'php') {
        // Simulate PHP's preg_match behavior in JavaScript
        const re = new RegExp(regex, flags + (pregMatchAll ? 'g' : ''))
        matches = testString.match(re)
      } else {
        // Python-style regex simulation
        const re = new RegExp(regex, flags)
        matches = testString.match(re)
      }

      setResult(matches ? JSON.stringify(matches, null, 2) : 'No matches found')
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleReset = () => {
    setRegex('')
    setFlags('')
    setTestString('')
    setPregMatchAll(false)
    setResult('')
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Regex Tester</h1>
        <div className="flex items-center gap-8">
          <RadioGroup
            defaultValue="php"
            value={language}
            onValueChange={(value) => setLanguage(value as Language)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="javascript" id="javascript" />
              <Label htmlFor="javascript">javascript</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="php" id="php" />
              <Label htmlFor="php">php</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="python" id="python" />
              <Label htmlFor="python">python</Label>
            </div>
          </RadioGroup>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="regex">Regular Expression:</Label>
            <div className="flex gap-2">
              <span className="text-lg">/</span>
              <Input
                id="regex"
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
                placeholder="Your Regex Here"
                className="font-mono"
              />
              <span className="text-lg">/</span>
              <Input
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                placeholder="flags"
                className="font-mono w-32"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Options</h2>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pregMatchAll"
                checked={pregMatchAll}
                onCheckedChange={(checked) => setPregMatchAll(checked as boolean)}
              />
              <Label htmlFor="pregMatchAll">preg_match_all</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testString">Test String:</Label>
            <Textarea
              id="testString"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Your Test String Here"
              className="font-mono min-h-[200px]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Matched Result:</Label>
              <Button onClick={handleTest}>Test</Button>
            </div>
            <Card className="p-4">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {result || 'Check Your Results Here'}
              </pre>
            </Card>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Reference</h2>
          <div className="border rounded-lg overflow-y-auto max-h-[600px]">
            <table className="w-full">
              <tbody className="divide-y">
                <tr className="hover:bg-muted/50">
                  <td className="p-2 font-mono">\</td>
                  <td className="p-2">general escape character with several uses</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="p-2 font-mono">^</td>
                  <td className="p-2">assert start of subject (or line, in multiline mode)</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="p-2 font-mono">$</td>
                  <td className="p-2">assert end of subject or before newline</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="p-2 font-mono">.</td>
                  <td className="p-2">match any character except newline</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="p-2 font-mono">[ ]</td>
                  <td className="p-2">character class definition</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="p-2 font-mono">|</td>
                  <td className="p-2">start of alternative branch</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="p-2 font-mono">( )</td>
                  <td className="p-2">subpattern</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

