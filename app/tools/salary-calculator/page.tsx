'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type PayPeriod = 'hour' | 'day' | 'week' | 'biweek' | 'semimonth' | 'month' | 'quarter' | 'year'
type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD'

interface SalaryState {
  amount: number
  unit: PayPeriod
  currency: Currency
  hoursPerWeek: number
  daysPerWeek: number
  holidaysPerYear: number
  vacationDaysPerYear: number
}

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
}

export default function SalaryCalculator() {
  const [salary, setSalary] = useState<SalaryState>({
    amount: 50,
    unit: 'hour',
    currency: 'USD',
    hoursPerWeek: 40,
    daysPerWeek: 5,
    holidaysPerYear: 10,
    vacationDaysPerYear: 15,
  })

  const calculateSalary = (base: number): Record<PayPeriod, { unadjusted: number; adjusted: number }> => {
    const workWeeksPerYear = 52
    const workDaysPerYear = salary.daysPerWeek * workWeeksPerYear
    const totalDaysOff = salary.holidaysPerYear + salary.vacationDaysPerYear
    const adjustmentFactor = (workDaysPerYear - totalDaysOff) / workDaysPerYear

    const hourlyRate = salary.unit === 'hour' ? base :
      salary.unit === 'day' ? base / salary.hoursPerWeek * salary.daysPerWeek :
      salary.unit === 'week' ? base / salary.hoursPerWeek :
      salary.unit === 'biweek' ? base / (2 * salary.hoursPerWeek) :
      salary.unit === 'month' ? base / (salary.hoursPerWeek * workWeeksPerYear / 12) :
      salary.unit === 'year' ? base / (salary.hoursPerWeek * workWeeksPerYear) :
      base

    return {
      hour: {
        unadjusted: hourlyRate,
        adjusted: hourlyRate * adjustmentFactor,
      },
      day: {
        unadjusted: hourlyRate * (salary.hoursPerWeek / salary.daysPerWeek),
        adjusted: hourlyRate * (salary.hoursPerWeek / salary.daysPerWeek) * adjustmentFactor,
      },
      week: {
        unadjusted: hourlyRate * salary.hoursPerWeek,
        adjusted: hourlyRate * salary.hoursPerWeek * adjustmentFactor,
      },
      biweek: {
        unadjusted: hourlyRate * salary.hoursPerWeek * 2,
        adjusted: hourlyRate * salary.hoursPerWeek * 2 * adjustmentFactor,
      },
      semimonth: {
        unadjusted: hourlyRate * salary.hoursPerWeek * (workWeeksPerYear / 24),
        adjusted: hourlyRate * salary.hoursPerWeek * (workWeeksPerYear / 24) * adjustmentFactor,
      },
      month: {
        unadjusted: hourlyRate * salary.hoursPerWeek * (workWeeksPerYear / 12),
        adjusted: hourlyRate * salary.hoursPerWeek * (workWeeksPerYear / 12) * adjustmentFactor,
      },
      quarter: {
        unadjusted: hourlyRate * salary.hoursPerWeek * (workWeeksPerYear / 4),
        adjusted: hourlyRate * salary.hoursPerWeek * (workWeeksPerYear / 4) * adjustmentFactor,
      },
      year: {
        unadjusted: hourlyRate * salary.hoursPerWeek * workWeeksPerYear,
        adjusted: hourlyRate * salary.hoursPerWeek * workWeeksPerYear * adjustmentFactor,
      },
    }
  }

  const results = calculateSalary(salary.amount)

  const handleReset = () => {
    setSalary({
      amount: 50,
      unit: 'hour',
      currency: 'USD',
      hoursPerWeek: 40,
      daysPerWeek: 5,
      holidaysPerYear: 10,
      vacationDaysPerYear: 15,
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Salary Calculator</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="amount">Salary amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={salary.amount}
                  onChange={(e) => setSalary({ ...salary, amount: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="w-32">
                <Label htmlFor="unit">per</Label>
                <Select
                  value={salary.unit}
                  onValueChange={(value: PayPeriod) => setSalary({ ...salary, unit: value })}
                >
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hour">Hour</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="biweek">Bi-weekly</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={salary.currency}
                onValueChange={(value: Currency) => setSalary({ ...salary, currency: value })}
              >
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                  <SelectItem value="AUD">AUD (A$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="hoursPerWeek">Hours per week</Label>
              <Input
                id="hoursPerWeek"
                type="number"
                value={salary.hoursPerWeek}
                onChange={(e) => setSalary({ ...salary, hoursPerWeek: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="daysPerWeek">Days per week</Label>
              <Input
                id="daysPerWeek"
                type="number"
                value={salary.daysPerWeek}
                onChange={(e) => setSalary({ ...salary, daysPerWeek: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="holidaysPerYear">Holidays per year</Label>
              <Input
                id="holidaysPerYear"
                type="number"
                value={salary.holidaysPerYear}
                onChange={(e) => setSalary({ ...salary, holidaysPerYear: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="vacationDaysPerYear">Vacation days per year</Label>
              <Input
                id="vacationDaysPerYear"
                type="number"
                value={salary.vacationDaysPerYear}
                onChange={(e) => setSalary({ ...salary, vacationDaysPerYear: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Reset to Defaults
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Unadjusted</TableHead>
                  <TableHead className="text-right">With Time Off</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(results).map(([period, values]) => (
                  <TableRow key={period}>
                    <TableCell className="font-medium capitalize">
                      {period === 'biweek' ? 'Bi-weekly' : 
                       period === 'semimonth' ? 'Semi-monthly' : 
                       period}
                    </TableCell>
                    <TableCell className="text-right">
                      {currencySymbols[salary.currency]}
                      {values.unadjusted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      {currencySymbols[salary.currency]}
                      {values.adjusted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

