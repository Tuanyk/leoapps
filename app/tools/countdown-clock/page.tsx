'use client'

import { useState } from 'react'
import { CountdownClock } from './components/CountdownClock'
import { DateTimePicker } from './components/DateTimePicker'

export default function CountdownClockPage() {
  const [targetDate, setTargetDate] = useState<Date | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Countdown Clock</h1>
        <DateTimePicker onDateChange={setTargetDate} />
        {targetDate && <CountdownClock targetDate={targetDate} />}
      </div>
    </div>
  )
}

