'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message)
      setOutput('')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Input JSON:
        </label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          rows={10}
          className="w-full p-2 border rounded"
        />
      </div>
      <Button onClick={formatJson} className="w-full">Format JSON</Button>
      {error && <div className="text-red-500">{error}</div>}
      {output && (
        <div>
          <label htmlFor="output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Formatted JSON:
          </label>
          <Textarea
            id="output"
            value={output}
            readOnly
            rows={10}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800"
          />
        </div>
      )}
    </div>
  )
}

