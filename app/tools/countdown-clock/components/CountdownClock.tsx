import { useState, useEffect } from 'react'

interface CountdownClockProps {
  targetDate: Date
}

export function CountdownClock({ targetDate }: CountdownClockProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date()
    let timeLeft = {}

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
    if (!timeLeft[interval]) {
      return null
    }

    return (
      <div key={interval} className="flex flex-col items-center">
        <div className="text-5xl font-bold text-white mb-2">
          {timeLeft[interval]}
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

