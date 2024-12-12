export type Unit = {
    name: string
    value: number // Conversion rate to square meters (base unit)
  }
  
  export const units: Unit[] = [
    { name: 'Square Meter', value: 1 },
    { name: 'Square Kilometer', value: 1000000 },
    { name: 'Square Centimeter', value: 0.0001 },
    { name: 'Square Millimeter', value: 0.000001 },
    { name: 'Square Micrometer', value: 1e-12 },
    { name: 'Hectare', value: 10000 },
    { name: 'Square Mile', value: 2589988.11 },
    { name: 'Square Yard', value: 0.836127 },
    { name: 'Square Foot', value: 0.092903 },
    { name: 'Square Inch', value: 0.00064516 },
    { name: 'Acre', value: 4046.86 },
  ]
  
  export function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
    const squareMeters = value * fromUnit.value
    return squareMeters / toUnit.value
  }
  