'use client'

import { useState } from 'react'
import styles from './TextCaseConverter.module.css'

export default function TextCaseConverter() {
  const [text, setText] = useState('')
  const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard')

  const transformText = (type: string) => {
    switch (type) {
      case 'uppercase':
        setText(text.toUpperCase())
        break
      case 'lowercase':
        setText(text.toLowerCase())
        break
      case 'capitalize':
        setText(text.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase()))
        break
      case 'sentence':
        const sentenceCase = text.toLowerCase().replace(/(^\w|\.\s+\w|\?\s+\w|\!\s+\w)/gm, l => l.toUpperCase())
        setText(sentenceCase.charAt(0).toUpperCase() + sentenceCase.slice(1))
        break
      case 'toggle':
        setText(text.split('').map(char =>
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join(''))
        break
      case 'alternate':
        setText(text.toLowerCase().split('').map((char, i) =>
          i % 2 ? char.toUpperCase() : char
        ).join(''))
        break
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyButtonText('Copied!')
      setTimeout(() => {
        setCopyButtonText('Copy to Clipboard')
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Text Case Converter</h1>
        <textarea
          id="input-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className={styles.textarea}
        />
        <div className={styles.buttonsContainer}>
          <button onClick={() => transformText('uppercase')}>UPPERCASE</button>
          <button onClick={() => transformText('lowercase')}>lowercase</button>
          <button onClick={() => transformText('capitalize')}>Capitalize Word</button>
          <button onClick={() => transformText('sentence')}>Sentence case</button>
          <button onClick={() => transformText('toggle')}>tOGGLE cASE</button>
          <button onClick={() => transformText('alternate')}>aLtErNaTe cAsE</button>
        </div>
        <div className={styles.copyContainer}>
          <button id="copy-button" onClick={copyToClipboard}>{copyButtonText}</button>
        </div>
      </div>
    </main>
  )
}

