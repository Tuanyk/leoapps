'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Change } from 'diff'
import { johnResigDiff, snowtideDiff, snowtideSideBySideDiff } from './diffAlgorithms'

type DiffAlgorithm = 'john-resig' | 'snowtide' | 'snowtide-side-by-side'

interface SideBySideDiff {
  left: string
  right: string
  changed: boolean
}

type DiffResult = Change[] | SideBySideDiff[]

export default function TextDiffTool() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [algorithm, setAlgorithm] = useState<DiffAlgorithm>('john-resig')
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null)

  const handleCompare = () => {
    switch (algorithm) {
      case 'john-resig':
        setDiffResult(johnResigDiff(text1, text2))
        break
      case 'snowtide':
        setDiffResult(snowtideDiff(text1, text2))
        break
      case 'snowtide-side-by-side':
        setDiffResult(snowtideSideBySideDiff(text1, text2))
        break
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Text Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Textarea
              placeholder="Enter original text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              rows={10}
              className="resize-none"
            />
            <Textarea
              placeholder="Enter modified text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              rows={10}
              className="resize-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Select value={algorithm} onValueChange={(value: DiffAlgorithm) => setAlgorithm(value)}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-resig">John Resig&lsquo;s algorithm</SelectItem>
                <SelectItem value="snowtide">Snowtide&lsquo;s algorithm</SelectItem>
                <SelectItem value="snowtide-side-by-side">Snowtide (side-by-side)</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCompare} className="w-full sm:w-auto">Compare</Button>
          </div>
        </CardContent>
      </Card>
      {diffResult && (
        <Card>
          <CardHeader>
            <CardTitle>Diff Result</CardTitle>
          </CardHeader>
          <CardContent>
            {algorithm === 'snowtide-side-by-side' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Original</h3>
                  <div className="border rounded p-2 bg-gray-50">
                    {(diffResult as SideBySideDiff[]).map((line, index) => (
                      <span
                        key={index}
                        className={line.changed ? 'text-red-600' : 'text-green-600'}
                      >
                        {line.left}{' '}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Modified</h3>
                  <div className="border rounded p-2 bg-gray-50">
                    {(diffResult as SideBySideDiff[]).map((line, index) => (
                      <span
                        key={index}
                        className={line.changed ? 'text-red-600' : 'text-green-600'}
                      >
                        {line.right}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap border rounded p-2 bg-gray-50">
                {(diffResult as Change[]).map((part, index) => (
                  <span
                    key={index}
                    className={
                      part.added ? 'text-red-600' :
                      part.removed ? 'text-red-600' :
                      'text-green-600'
                    }
                  >
                    {part.value}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

