'use client'

import { useState } from 'react'
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

      <div className="mt-12 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
        <ol className="list-decimal list-inside space-y-4">
          <li>
            <strong>Paste your HTML content:</strong> Start by pasting your HTML content into the &quot;Input HTML&quot; textarea on the left.
          </li>
          <li>
            <strong>Add anchor texts and links:</strong> Use the &quot;Add Links&quot; section below the textareas to input your desired anchor texts and their corresponding links. Click the &quot;Add&quot; button after entering each pair.
          </li>
          <li>
            <strong>Insert links:</strong> Once you&apos;ve added all your anchor texts and links, click the &quot;Insert Links&quot; button to process your content.
          </li>
          <li>
            <strong>Review the output:</strong> The processed HTML will appear in the &quot;Output HTML&quot; textarea on the right. You can copy this content using the &quot;Copy to Clipboard&quot; button below it.
          </li>
          <li>
            <strong>Check inserted links:</strong> The &quot;Inserted Links&quot; section will show you which links were successfully inserted into your content.
          </li>
          <li>
            <strong>Handle not found anchor texts:</strong> If any anchor texts weren&apos;t found in your content, they&apos;ll appear in the &quot;Not Found Anchor Texts&quot; section. Each item will have a &quot;Xem thêm&quot; link that you can copy and manually insert into your content if needed.
          </li>
        </ol>
        <div className="mt-4">
          <p className="font-semibold">Note:</p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>The tool performs case-insensitive matching for anchor texts.</li>
            <li>If multiple instances of an anchor text are found, the tool will randomly select one to insert the link.</li>
            <li>Each anchor text will only have a link inserted once, even if it appears multiple times in the content.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

