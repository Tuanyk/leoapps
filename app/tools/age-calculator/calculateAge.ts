export function calculateAge(startDate: Date, endDate: Date) {
    const diff = endDate.getTime() - startDate.getTime()
  
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))
    const weeks = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7))
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
    return { years, months, weeks, days, hours, minutes, seconds }
  }
  
  