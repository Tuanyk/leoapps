'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

export default function CoinToss() {
  const [result, setResult] = useState<'heads' | 'tails' | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)

  const flipCoin = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setResult(Math.random() < 0.5 ? 'heads' : 'tails')
      setIsFlipping(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <h1 className="text-4xl font-bold mb-8">Coin Toss Tool</h1>
      <div className="relative w-40 h-40 mb-8">
        <motion.div
          className="w-full h-full rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold shadow-lg"
          animate={{
            rotateX: isFlipping ? 1080 : 0,
            transition: { duration: 1 }
          }}
        >
          {result === 'heads' ? 'H' : 'T'}
        </motion.div>
      </div>
      <Button onClick={flipCoin} disabled={isFlipping}>
        {isFlipping ? 'Flipping...' : 'Flip Coin'}
      </Button>
      {result && !isFlipping && (
        <p className="mt-4 text-2xl font-semibold">
          Result: {result.charAt(0).toUpperCase() + result.slice(1)}
        </p>
      )}
    </div>
  )
}

