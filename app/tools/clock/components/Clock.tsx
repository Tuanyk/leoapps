import { useMemo } from 'react'

interface ClockProps {
  time: Date
}

export function Clock({ time }: ClockProps) {
  const { hour, minute, nearestInterval, minuteText } = useMemo(() => {
    const hour = time.getHours()
    const minute = time.getMinutes()
    const nearestInterval = Math.round(minute / 5) * 5
    const minuteText = nearestInterval === minute ? '' : `Near ${nearestInterval}`

    return { hour, minute, nearestInterval, minuteText }
  }, [time])

  return (
    <div className="relative w-64 h-64 rounded-full border-4 border-white">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <div
          key={angle}
          className="absolute w-1 h-4 bg-white"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-30px)`,
          }}
        />
      ))}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-16 bg-white origin-bottom"
        style={{
          transform: `translate(-50%, -100%) rotate(${hour * 30 + minute * 0.5}deg)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-1 h-24 bg-white origin-bottom"
        style={{
          transform: `translate(-50%, -100%) rotate(${nearestInterval * 6}deg)`,
        }}
      />
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold">
        {`${hour.toString().padStart(2, '0')}:${nearestInterval.toString().padStart(2, '0')}`}
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-lg">
        {minuteText}
      </div>
    </div>
  )
}

