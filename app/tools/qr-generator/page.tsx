'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { generateQRCode } from './actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'

type QRType = 'text' | 'url' | 'email' | 'phone'

export default function QRGenerator() {
  const [qrType, setQRType] = useState<QRType>('text')
  const [qrData, setQRData] = useState('')
  const [state, formAction] = useActionState(generateQRCode, { success: false })

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>QR Code Generator</CardTitle>
          <CardDescription>Generate QR codes for text, URLs, and more</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <RadioGroup defaultValue={qrType} onValueChange={(value: QRType) => setQRType(value)} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text">Text</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="url" id="url" />
                <Label htmlFor="url">URL</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone">Phone</Label>
              </div>
            </RadioGroup>

            {qrType === 'text' && (
              <Textarea
                name="qrData"
                placeholder="Enter your text here"
                value={qrData}
                onChange={(e) => setQRData(e.target.value)}
                rows={4}
              />
            )}

            {qrType === 'url' && (
              <Input
                name="qrData"
                type="url"
                placeholder="https://example.com"
                value={qrData}
                onChange={(e) => setQRData(e.target.value)}
              />
            )}

            {qrType === 'email' && (
              <Input
                name="qrData"
                type="email"
                placeholder="example@email.com"
                value={qrData}
                onChange={(e) => setQRData(e.target.value)}
              />
            )}

            {qrType === 'phone' && (
              <Input
                name="qrData"
                type="tel"
                placeholder="+1234567890"
                value={qrData}
                onChange={(e) => setQRData(e.target.value)}
              />
            )}

            <Button type="submit" disabled={!qrData}>
              Generate QR Code
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          {state && state.success && state.dataURL && (
            <div className="text-center">
              <div className="relative w-64 h-64 mx-auto mb-4">
                <Image
                  src={state.dataURL}
                  alt="Generated QR Code"
                  width={256}
                  height={256}
                />
              </div>
              <Button
                onClick={() => {
                  if (state.dataURL) {
                    const link = document.createElement('a')
                    link.href = state.dataURL
                    link.download = 'qrcode.png'
                    link.click()
                  }
                }}
              >
                Download QR Code
              </Button>
            </div>
          )}
          {state && !state.success && state.error && (
            <p className="text-red-500">{state.error}</p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

