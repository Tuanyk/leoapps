export type Unit = {
    name: string
    value: number // Conversion rate to grams (base unit)
  }
  
  export const units: Unit[] = [
    { name: 'Kilogram', value: 1000 },
    { name: 'Gram', value: 1 },
    { name: 'Milligram', value: 0.001 },
    { name: 'Metric Ton', value: 1000000 },
    { name: 'Long Ton', value: 1016046.91 },
    { name: 'Short Ton', value: 907184.74 },
    { name: 'Pound', value: 453.592 },
    { name: 'Ounce', value: 28.3495 },
    { name: 'Carrat', value: 0.2 },
    { name: 'Atomic Mass Unit', value: 1.660539067e-24 },
  ]
  
  export function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
    const grams = value * fromUnit.value
    return grams / toUnit.value
  }
  
  