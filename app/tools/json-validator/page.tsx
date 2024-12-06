'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle } from 'lucide-react'


export default function JSONValidator() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const validateJSON = () => {
    try {
      const parsedJSON = JSON.parse(input)
      setOutput(JSON.stringify(parsedJSON, null, 2))
      setIsValid(true)
    } catch (error) {
      setOutput(error instanceof Error ? error.message : 'An error occurred')
      setIsValid(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">JSON Validator</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-2">Input JSON</h2>
          <Textarea
            placeholder="Paste your JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-64"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Validated Output</h2>
          <Textarea
            value={output}
            readOnly
            className="h-64"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Button onClick={validateJSON}>Validate JSON</Button>
      </div>
      {isValid !== null && (
        <Alert className={`mt-6 ${isValid ? 'bg-green-50' : 'bg-red-50'}`}>
          {isValid ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertTitle>{isValid ? 'Valid JSON' : 'Invalid JSON'}</AlertTitle>
          <AlertDescription>
            {isValid
              ? 'Your JSON is valid and has been formatted.'
              : 'Please check your JSON for errors and try again.'}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

