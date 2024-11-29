import { useState } from 'react'

interface DateTimePickerProps {
  onDateChange: (date: Date) => void
}

export function DateTimePicker({ onDateChange }: DateTimePickerProps) {
  const [dateTime, setDateTime] = useState('')

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(e.target.value)
    onDateChange(new Date(e.target.value))
  }

  return (
    <div className="mb-6">
      <label htmlFor="datetime-input" className="block text-white text-lg mb-2">
        Set Target Date and Time:
      </label>
      <input
        type="datetime-local"
        id="datetime-input"
        value={dateTime}
        onChange={handleDateTimeChange}
        className="w-full p-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>
  )
}

