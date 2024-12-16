'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface LinkItem {
  anchorText: string
  link: string
}

interface LinkInserterProps {
  inputContent: string
  setOutputContent: (content: string) => void
  setSummary: (summary: { inserted: string[], notFound: string[] }) => void
}

export default function LinkInserter({ inputContent, setOutputContent, setSummary }: LinkInserterProps) {
  const [linkItems, setLinkItems] = useState<LinkItem[]>([])
  const [anchorText, setAnchorText] = useState('')
  const [link, setLink] = useState('')

  const addLinkItem = () => {
    if (anchorText && link) {
      setLinkItems([...linkItems, { anchorText, link }])
      setAnchorText('')
      setLink('')
    }
  }

  const insertLinks = () => {
    let content = inputContent
    const inserted: string[] = []
    const notFound: string[] = []

    linkItems.forEach(({ anchorText, link }) => {
      const regex = new RegExp(`\\b${anchorText}\\b`, 'gi')
      const matches = content.match(regex)

      if (matches) {
        const randomIndex = Math.floor(Math.random() * matches.length)
        let replaced = false
        content = content.replace(regex, (match) => {
          if (!replaced && Math.random() < 1 / (matches.length - randomIndex)) {
            replaced = true
            inserted.push(`${anchorText} -> ${link}`)
            return `<a href="${link}">${match}</a>`
          }
          return match
        })
      } else {
        notFound.push(`${anchorText} -> ${link}`)
      }
    })

    setOutputContent(content)
    setSummary({ inserted, notFound })
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Add Links</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={anchorText}
          onChange={(e) => setAnchorText(e.target.value)}
          placeholder="Anchor Text"
          className="flex-grow"
        />
        <Input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link"
          className="flex-grow"
        />
        <Button onClick={addLinkItem}>Add</Button>
      </div>
      {linkItems.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Link Items:</h3>
          <ul className="list-disc list-inside">
            {linkItems.map((item, index) => (
              <li key={index}>{item.anchorText} -&gt; {item.link}</li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={insertLinks}>Insert Links</Button>
    </div>
  )
}

