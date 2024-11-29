'use client'

import { useState } from 'react'
import { slugifyText } from './actions'

export default function SlugifyForm() {
  const [slug, setSlug] = useState('')
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard')

  async function handleSubmit(formData: FormData) {
    const result = await slugifyText(formData)
    setSlug(result)
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(slug)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form action={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="text-submit" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your text to convert into a URL-friendly slug:
          </label>
          <input
            id="text-submit"
            name="text"
            type="text"
            placeholder="Type your text here..."
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate Slug
        </button>
      </form>

      {slug && (
        <div className="mt-6">
          <div className="bg-gray-100 p-4 rounded-md mb-4 border border-gray-300">
            <p className="font-mono break-all">{slug}</p>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {copyStatus}
          </button>
        </div>
      )}
    </div>
  )
}

