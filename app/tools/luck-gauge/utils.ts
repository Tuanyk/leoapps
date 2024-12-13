export const calculateRotation = (value: number): number => {
  return value * 180 // 0 to 180 degrees
}

export const getColorForLuck = (value: number): string => {
  if (value <= 0.25) return 'rgb(239, 68, 68)' // red-500
  if (value <= 0.5) return 'rgb(249, 115, 22)' // orange-500
  if (value <= 0.75) return 'rgb(234, 179, 8)' // yellow-500
  return 'rgb(34, 197, 94)' // green-500
}

export const getLuckLabel = (value: number): string => {
  if (value <= 0.25) return 'Unlucky'
  if (value <= 0.5) return 'Neutral'
  if (value <= 0.75) return 'Lucky'
  return 'Very Lucky'
}
