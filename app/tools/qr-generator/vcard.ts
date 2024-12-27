export type QRType = 'text' | 'url' | 'email' | 'phone' | 'vcard'

export interface VCardData {
  firstName: string
  lastName: string
  mobile: string
  fax?: string
  email: string
  company?: string
  jobTitle?: string
  street?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  website?: string
}


export function formatVCard(data: Partial<VCardData>): string {
    const fields = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      data.firstName || data.lastName ? `N:${data.lastName || ''};${data.firstName || ''};;;` : null,
      data.firstName || data.lastName ? `FN:${[data.firstName, data.lastName].filter(Boolean).join(' ')}` : null,
      data.mobile && `TEL;TYPE=CELL:${data.mobile}`,
      data.fax && `TEL;TYPE=FAX:${data.fax}`,
      data.email && `EMAIL:${data.email}`,
      data.company && `ORG:${data.company}`,
      data.jobTitle && `TITLE:${data.jobTitle}`,
      data.street && data.city && data.state && data.zip && 
        `ADR;TYPE=WORK:;;${data.street};${data.city};${data.state};${data.zip};${data.country || ''}`,
      data.website && `URL:${data.website}`,
      'END:VCARD'
    ]
  
    return fields.filter(Boolean).join('\n')
  }
  
