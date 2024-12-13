'use client'

import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Frown, Meh, Smile, HelpCircle } from 'lucide-react'

const luckLevels = [
  { name: 'Unlucky', color: 'bg-red-500', icon: Frown },
  { name: 'Neutral', color: 'bg-yellow-500', icon: Meh },
  { name: 'Lucky', color: 'bg-green-500', icon: Smile },
  { name: 'Very Lucky', color: 'bg-blue-500', icon: Sparkles },
]

export default function EnhancedLuckEstimator() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [result, setResult] = useState<typeof luckLevels[number] | null>(null)

  const { rotation, scale } = useSpring({
    from: { rotation: 0, scale: 1 },
    to: async (next) => {
      if (isAnimating) {
        await next({ rotation: 360, scale: 1.2, config: { duration: 1000 } })
        await next({ rotation: 720, scale: 1, config: { duration: 1000 } })
        await next({ rotation: 1080, scale: 1.2, config: { duration: 1000 } })
        await next({ rotation: 1440, scale: 1, config: { duration: 1000 } })
      }
    },
    config: { tension: 300, friction: 10 },
  })

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setResult(luckLevels[Math.floor(Math.random() * luckLevels.length)])
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  const startAnimation = () => {
    setIsAnimating(true)
    setResult(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Enhanced Luck Estimator</CardTitle>
          <CardDescription className="text-center">Watch the bubble to reveal your luck!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative w-64 h-64 mb-8">
            <animated.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
              style={{
                transform: isAnimating
                  ? rotation.to((r) => `rotate(${r}deg)`)
                  : 'none',
                scale: scale,
              }}
            />
            {result && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`p-4 rounded-full ${result.color}`}>
                  <result.icon className="w-12 h-12 text-white" />
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={startAnimation}
            disabled={isAnimating}
            className="w-full max-w-xs"
          >
            {isAnimating ? 'Estimating...' : 'Estimate Your Luck'}
          </Button>
          {result && (
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold">{result.name}</h3>
              <p className="text-sm text-gray-600">
                {result.name === 'Unlucky'
                  ? "Don't worry, your luck will turn around soon!"
                  : result.name === 'Neutral'
                  ? "Not bad, but there's room for improvement!"
                  : result.name === 'Lucky'
                  ? "Great! The odds are in your favor!"
                  : "Wow! You're on a lucky streak!"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            How to Use the Enhanced Luck Estimator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Click the &quot;Estimate Your Luck&quot; button to start the animation.</li>
            <li>Watch as the colorful bubble spins and pulsates for a few seconds.</li>
            <li>The animation will slow down, revealing your luck result.</li>
            <li>Your result will be one of the following:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li className="flex items-center"><Frown className="w-4 h-4 mr-2 text-red-500" /> Unlucky</li>
                <li className="flex items-center"><Meh className="w-4 h-4 mr-2 text-yellow-500" /> Neutral</li>
                <li className="flex items-center"><Smile className="w-4 h-4 mr-2 text-green-500" /> Lucky</li>
                <li className="flex items-center"><Sparkles className="w-4 h-4 mr-2 text-blue-500" /> Very Lucky</li>
              </ul>
            </li>
            <li>Read the accompanying message for a fun interpretation of your luck.</li>
            <li>Feel free to try again as many times as you like!</li>
          </ol>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Note:</strong> This tool is for entertainment purposes only. Your actual luck may vary in real-life situations.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

