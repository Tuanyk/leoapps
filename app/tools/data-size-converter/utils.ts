export type Unit = {
    name: string
    value: number // Conversion rate to bytes (base unit)
  }
  
  export const units: Unit[] = [
    { name: 'Bytes', value: 1 },
    { name: 'Kilobytes (KB)', value: 1024 },
    { name: 'Megabytes (MB)', value: 1024 * 1024 },
    { name: 'Gigabytes (GB)', value: 1024 * 1024 * 1024 },
    { name: 'Terabytes (TB)', value: 1024 * 1024 * 1024 * 1024 },
    { name: 'Petabytes (PB)', value: 1024 * 1024 * 1024 * 1024 * 1024 },
  ]
  
  export function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
    const bytes = value * fromUnit.value
    return bytes / toUnit.value
  }
  