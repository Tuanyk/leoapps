'use client'

import { useState, useEffect } from 'react'
import { calculateAge } from './calculateAge'

export default function AgeCalculator() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [result, setResult] = useState<ReturnType<typeof calculateAge> | null>(null)

  useEffect(() => {
    setEndDate(new Date().toISOString().split('T')[0])
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const age = calculateAge(new Date(startDate), new Date(endDate))
    setResult(age)
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            defaultValue={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Calculate Age
          </button>
        </div>
      </form>
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Result:</h2>
          <p>Years: {result.years}</p>
          <p>Months: {result.months}</p>
          <p>Weeks: {result.weeks}</p>
          <p>Days: {result.days}</p>
          <p>Hours: {result.hours}</p>
          <p>Minutes: {result.minutes}</p>
          <p>Seconds: {result.seconds}</p>
        </div>
      )}
    </div>
  )
}

