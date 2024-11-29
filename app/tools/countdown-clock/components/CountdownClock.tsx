import { useState, useEffect } from 'react';

interface CountdownClockProps {
  targetDate: Date;
}

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export function CountdownClock({ targetDate }: CountdownClockProps) {
  // Initialize timeLeft with the correct type
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  // Calculate the time left
  function calculateTimeLeft(): TimeLeft {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [targetDate]); // Add targetDate to dependency array to recalculate when it changes

  // Map over the timeLeft object to create components
  const timerComponents = Object.keys(timeLeft).map(interval => {
    // Check if timeLeft[interval] exists and is a valid number
    const value = timeLeft[interval as keyof TimeLeft];
    if (value === undefined || value === 0) {
      return null;
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
    );
  });

  return (
    <div className="mt-8">
      <div className="flex justify-around">
        {timerComponents.length ? timerComponents : <span className="text-2xl text-white">Time&apos;s up!</span>}
      </div>
    </div>
  );
}
