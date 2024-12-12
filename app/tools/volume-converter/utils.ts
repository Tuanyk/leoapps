export type Unit = {
    name: string
    value: number // Conversion rate to cubic meters (base unit)
  }
  
  export const units: Unit[] = [
    { name: 'Cubic Meter', value: 1 },
    { name: 'Cubic Kilometer', value: 1e9 },
    { name: 'Cubic Centimeter', value: 1e-6 },
    { name: 'Cubic Millimeter', value: 1e-9 },
    { name: 'Liter', value: 0.001 },
    { name: 'Milliliter', value: 1e-6 },
    { name: 'US Gallon', value: 0.00378541 },
    { name: 'US Quart', value: 0.000946353 },
    { name: 'US Pint', value: 0.000473176 },
    { name: 'US Cup', value: 0.000236588 },
    { name: 'US Fluid Ounce', value: 2.95735e-5 },
    { name: 'US Table Spoon', value: 1.47868e-5 },
    { name: 'US Tea Spoon', value: 4.92892e-6 },
    { name: 'Imperial Gallon', value: 0.00454609 },
    { name: 'Imperial Quart', value: 0.00113652 },
    { name: 'Imperial Pint', value: 0.000568261 },
    { name: 'Imperial Fluid Ounce', value: 2.84131e-5 },
    { name: 'Imperial Table Spoon', value: 1.77582e-5 },
    { name: 'Imperial Tea Spoon', value: 5.91939e-6 },
    { name: 'Cubic Mile', value: 4.16818e9 },
    { name: 'Cubic Yard', value: 0.764555 },
    { name: 'Cubic Foot', value: 0.0283168 },
    { name: 'Cubic Inch', value: 1.63871e-5 },
    // Additional units
    { name: 'Acre-foot', value: 1233.48 },
    { name: 'Barrel (Oil)', value: 0.158987 },
    { name: 'Bushel (US)', value: 0.0352391 },
    { name: 'Cord', value: 3.62456 },
    { name: 'Gill (US)', value: 1.18294e-4 },
    { name: 'Gill (Imperial)', value: 1.42065e-4 },
  ]
  
  export function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
    const cubicMeters = value * fromUnit.value
    return cubicMeters / toUnit.value
  }
  
  