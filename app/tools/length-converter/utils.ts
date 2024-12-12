export type Unit = {
    name: string
    value: number // Conversion rate to meters (base unit)
  }
  
  export const units: Unit[] = [
    { name: 'Meter', value: 1 },
    { name: 'Kilometer', value: 1000 },
    { name: 'Centimeter', value: 0.01 },
    { name: 'Millimeter', value: 0.001 },
    { name: 'Micrometer', value: 0.000001 },
    { name: 'Nanometer', value: 0.000000001 },
    { name: 'Mile', value: 1609.344 },
    { name: 'Yard', value: 0.9144 },
    { name: 'Foot', value: 0.3048 },
    { name: 'Inch', value: 0.0254 },
  ]
  
  export function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
    const meters = value * fromUnit.value
    return meters / toUnit.value
  }
  
  