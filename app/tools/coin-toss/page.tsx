'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type CoinResult = 'heads' | 'tails'

export default function CoinToss() {
  const [results, setResults] = useState<CoinResult[]>([])
  const [isFlipping, setIsFlipping] = useState(false)
  const [numCoins, setNumCoins] = useState(1)

  const flipCoins = () => {
    setIsFlipping(true)
    const newResults: CoinResult[] = []
    const flipDuration = 1000 // 1 second flip animation

    for (let i = 0; i < numCoins; i++) {
      setTimeout(() => {
        newResults.push(Math.random() < 0.5 ? 'heads' : 'tails')
        setResults([...newResults])
        if (i === numCoins - 1) {
          setIsFlipping(false)
        }
      }, i * (flipDuration / 2)) // Stagger the start of each coin flip
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-4">
      <h1 className="text-4xl font-bold mb-8">Coin Toss Tool</h1>
      <div className="mb-4 w-full max-w-xs">
        <Label htmlFor="numCoins" className="block text-sm font-medium text-gray-700 mb-1">
          Number of coins to toss:
        </Label>
        <Input
          id="numCoins"
          type="number"
          min="1"
          max="10"
          value={numCoins}
          onChange={(e) => setNumCoins(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Array(numCoins).fill(null).map((_, index) => (
          <motion.div
            key={index}
            className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-xl font-bold shadow-lg"
            animate={{
              rotateX: isFlipping ? [0, 360, 720, 1080] : 0,
              scale: isFlipping ? [1, 1.2, 0.8, 1] : 1,
            }}
            transition={{
              duration: 1,
              delay: index * 0.2, // Stagger the animations
              ease: "easeInOut",
            }}
          >
            {results[index] ? (results[index] === 'heads' ? 'H' : 'T') : '?'}
          </motion.div>
        ))}
      </div>
      <Button onClick={flipCoins} disabled={isFlipping} className="mb-4">
        {isFlipping ? 'Flipping...' : 'Flip Coins'}
      </Button>
      {results.length > 0 && !isFlipping && (
        <div className="text-center">
          <p className="text-2xl font-semibold mb-2">Results:</p>
          <p className="text-lg">
            Heads: {results.filter(r => r === 'heads').length} | 
            Tails: {results.filter(r => r === 'tails').length}
          </p>
        </div>
      )}
    </div>
  )
}

