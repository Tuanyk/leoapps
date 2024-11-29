'use client'

import { useState, useEffect } from 'react'
import { Clock } from './components/Clock'

export default function BeautifulClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Leonardo&#39;s Clock</h1>
        <Clock time={time} />
      </div>
    </div>
  )
}

