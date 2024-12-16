'use client'

import { useState } from 'react'
import Head from 'next/head'
import LinkInserter from './linkInserter'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export default function Home() {
  const [inputContent, setInputContent] = useState('')
  const [outputContent, setOutputContent] = useState('')
  const [summary, setSummary] = useState<{ inserted: string[], notFound: string[] }>({ inserted: [], notFound: [] })
  const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard')
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({})

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text).then(() => {
      if (index !== undefined) {
        setCopiedStates(prev => ({ ...prev, [index]: true }))
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [index]: false }))
        }, 2000)
      } else {
        setCopyButtonText('Copied')
        setTimeout(() => setCopyButtonText('Copy to Clipboard'), 2000)
      }
    }).catch(err => {
      console.error('Failed to copy text: ', err)
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Link Inserter Tool</title>
        <meta name="description" content="Insert links into your HTML content easily with our Link Inserter Tool." />
        <link rel="canonical" href="/tools/link-inserter" />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Link Inserter Tool</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Input HTML</h2>
          <textarea
            className="w-full h-64 p-2 border rounded"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Paste your HTML content here..."
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Output HTML</h2>
          <textarea
            className="w-full h-64 p-2 border rounded"
            value={outputContent}
            readOnly
            placeholder="Processed HTML will appear here..."
          />
          <Button 
            onClick={() => copyToClipboard(outputContent)} 
            className="mt-2"
          >
            {copyButtonText}
          </Button>
        </div>
      </div>
      <LinkInserter
        inputContent={inputContent}
        setOutputContent={setOutputContent}
        setSummary={setSummary}
      />
      {summary.notFound.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Not Found Anchor Texts</h2>
          {summary.notFound.map((item, index) => {
            const [anchorText, link] = item.split(' -> ')
            const htmlContent = `Xem thêm: <a href="${link}">${anchorText}</a>`
            return (
              <div key={index} className="p-2 border rounded mb-2">
                <div className="flex justify-between items-center">
                  <p>Xem thêm: <a href={link}>{anchorText}</a></p>
                  <Button
                    onClick={() => copyToClipboard(htmlContent, index)}
                    size="sm"
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copiedStates[index] ? 'Copied' : 'Copy'}
                  </Button>
                </div>
                <code className="block mt-2 bg-gray-100 p-2 rounded">
                  {htmlContent}
                </code>
              </div>
            )
          })}
        </div>
      )}
      {summary.inserted.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Inserted Links</h2>
          <ul className="list-disc list-inside">
            {summary.inserted.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

