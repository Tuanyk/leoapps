import { useState, useEffect } from 'react'

// Define an interface for the time left object
interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface CountdownClockProps {
  targetDate: Date
}

export function CountdownClock({ targetDate }: CountdownClockProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  function calculateTimeLeft(): TimeLeft {
    const difference = +targetDate - +new Date()
    let timeLeft: TimeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timerComponents = Object.keys(timeLeft).map(interval => {
    // Type assertion to tell TypeScript that timeLeft has the correct type
    const value = timeLeft[interval as keyof TimeLeft]
    
    if (!value) {
      return null
    }

    return (
      <div key={interval} className="flex flex-col items-center">
        <div className="text-5xl font-bold text-white mb-2">
          {value}
        </div>
        <div className="text-xl text-white opacity-80">
          {interval}
        </div>
      </div>
    )
  })

  return (
    <div className="mt-8">
      <div className="flex justify-around">
        {timerComponents.length ? timerComponents : <span className="text-2xl text-white">Time&apos;s up!</span>}
      </div>
    </div>
  )
}