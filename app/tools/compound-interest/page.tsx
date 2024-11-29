"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(10000)
  const [rate, setRate] = useState<number>(5)
  const [years, setYears] = useState<number>(10)
  const [contribution, setContribution] = useState<number>(100)
  const [contributionFrequency, setContributionFrequency] = useState<"monthly" | "yearly">("monthly")
  const [compoundingFrequency, setCompoundingFrequency] = useState<"monthly" | "quarterly" | "yearly">("yearly")

  const calculateCompoundInterest = () => {
    const periodsPerYear = {
      monthly: 12,
      quarterly: 4,
      yearly: 1,
    }

    const n = periodsPerYear[compoundingFrequency]
    const r = rate / 100
    const t = years
    const PMT = contribution * (contributionFrequency === "monthly" ? 12 : 1)

    // Calculate compound interest with regular contributions
    let amount = principal * Math.pow(1 + r/n, n*t)
    
    // Add contributions
    if (PMT > 0) {
      amount += PMT * ((Math.pow(1 + r/n, n*t) - 1) / (r/n))
    }

    const totalContributions = principal + (PMT * t)
    const interestEarned = amount - totalContributions

    return {
      finalAmount: amount,
      totalContributions,
      interestEarned,
    }
  }

  const results = calculateCompoundInterest()

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Compound Interest Calculator</CardTitle>
          <CardDescription>
            Calculate how your investments can grow with compound interest and regular contributions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="principal">Initial Investment ($)</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years">Time Period (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compounding">Compounding Frequency</Label>
              <Select
                value={compoundingFrequency}
                onValueChange={(value: "monthly" | "quarterly" | "yearly") => 
                  setCompoundingFrequency(value)
                }
              >
                <SelectTrigger id="compounding">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t pt-6">
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly Contribution</TabsTrigger>
                <TabsTrigger value="yearly">Yearly Contribution</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  value={contributionFrequency === "monthly" ? contribution : contribution / 12}
                  onChange={(e) => {
                    setContribution(Number(e.target.value))
                    setContributionFrequency("monthly")
                  }}
                />
              </TabsContent>
              <TabsContent value="yearly" className="space-y-2">
                <Label htmlFor="yearlyContribution">Yearly Contribution ($)</Label>
                <Input
                  id="yearlyContribution"
                  type="number"
                  value={contributionFrequency === "yearly" ? contribution : contribution * 12}
                  onChange={(e) => {
                    setContribution(Number(e.target.value))
                    setContributionFrequency("yearly")
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Final Amount</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 px-4 pb-4">
                  <div className="text-2xl font-bold">
                    ${results.finalAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Total Contributions</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 px-4 pb-4">
                  <div className="text-2xl font-bold">
                    ${results.totalContributions.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Interest Earned</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 px-4 pb-4">
                  <div className="text-2xl font-bold text-green-600">
                    ${results.interestEarned.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

