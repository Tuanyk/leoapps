'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function LuckGauge() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)

  const testLuck = () => {
    setIsSpinning(true)
    setResult(null)
    setRotation(0)

    setTimeout(() => {
      const luckScore = Math.floor(Math.random() * 101)
      setRotation(luckScore * 1.8) 
      
      setTimeout(() => {
        setIsSpinning(false)
        if (luckScore < 20) {
          setResult("Extremely Unlucky! Did you break a mirror recently?")
        } else if (luckScore < 40) {
          setResult("Not Your Day! Maybe stay in bed?")
        } else if (luckScore < 60) {
          setResult("Average Luck. Nothing special here!")
        } else if (luckScore < 80) {
          setResult("Pretty Lucky! Buy a scratch card!")
        } else {
          setResult("Extremely Lucky! Go play the lottery NOW!")
        }
      }, 3000)
    }, 2000)
  }

  useEffect(() => {
    let animationFrame: number

    const animateNeedle = () => {
      setRotation((prevRotation) => (prevRotation + 10) % 360)
      animationFrame = requestAnimationFrame(animateNeedle)
    }

    if (isSpinning) {
      animationFrame = requestAnimationFrame(animateNeedle)
    }

    return () => cancelAnimationFrame(animationFrame)
  }, [isSpinning])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-white">Test Your Luck!</h1>
        <div className="relative w-96 h-48">
          {/* Gauge Background */}
          <svg
            viewBox="0 0 200 100"
            className="w-full h-full"
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#ff4444' }} />
                <stop offset="25%" style={{ stopColor: '#ff8f44' }} />
                <stop offset="50%" style={{ stopColor: '#ffff44' }} />
                <stop offset="75%" style={{ stopColor: '#88ff44' }} />
                <stop offset="100%" style={{ stopColor: '#44ff44' }} />
              </linearGradient>
            </defs>

            {/* Main Gauge Arc */}
            <path
              d="M20 80 A60 60 0 0 1 180 80"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Tick Marks */}
            {Array.from({ length: 11 }).map((_, i) => {
              const angle = -180 + (i * 180) / 10
              const x1 = 100 + 48 * Math.cos((angle * Math.PI) / 180)
              const y1 = 80 + 48 * Math.sin((angle * Math.PI) / 180)
              const x2 = 100 + 60 * Math.cos((angle * Math.PI) / 180)
              const y2 = 80 + 60 * Math.sin((angle * Math.PI) / 180)
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="white"
                  strokeWidth="2"
                />
              )
            })}

            {/* Needle */}
            <g
              transform={`rotate(${rotation - 180}, 100, 80)`}
              style={{ transition: isSpinning ? 'none' : 'transform 1s cubic-bezier(0.4, 2, 0.55, 0.44)' }}
            >
              <line
                x1="100"
                y1="80"
                x2="100"
                y2="30"
                stroke="white"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="80"
                r="5"
                fill="white"
              />
            </g>
          </svg>
        </div>
        <Button
          onClick={testLuck}
          disabled={isSpinning}
          className="mt-8 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 hover:from-red-600 hover:via-yellow-600 hover:to-green-600 text-white font-bold py-2 px-4 rounded-full text-lg transition-all duration-200 transform hover:scale-105"
        >
          {isSpinning ? "Calculating Luck..." : "Test My Luck!"}
        </Button>
        {result && (
          <p className="mt-8 text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg animate-bounce">
            {result}
          </p>
        )}
      </div>
    </div>
  )
}

