'use server'

import QRCode from 'qrcode'

export async function generateQRCode(prevState: unknown, formData: FormData): Promise<{ success: boolean; dataURL?: string; error?: string }> {
  const data = formData.get('qrData') as string
  
  if (!data) {
    return { success: false, error: 'No data provided' }
  }

  try {
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
    return { success: true, dataURL: qrCodeDataURL }
  } catch (error) {
    console.error('Error generating QR code:', error)
    return { success: false, error: 'Failed to generate QR code' }
  }
}

