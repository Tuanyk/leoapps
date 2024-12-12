export type Unit = {
    name: string
    toBase: (value: number) => number // Convert to Celsius
    fromBase: (celsius: number) => number // Convert from Celsius
  }
  
  export const units: Unit[] = [
    {
      name: 'Celsius',
      toBase: (value) => value,
      fromBase: (celsius) => celsius,
    },
    {
      name: 'Fahrenheit',
      toBase: (value) => (value - 32) * (5/9),
      fromBase: (celsius) => celsius * (9/5) + 32,
    },
    {
      name: 'Kelvin',
      toBase: (value) => value - 273.15,
      fromBase: (celsius) => celsius + 273.15,
    },
  ]
  
  export function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
    const celsius = fromUnit.toBase(value)
    return toUnit.fromBase(celsius)
  }
  
  