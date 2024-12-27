import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { VCardData } from './vcard'

interface VCardFormProps {
  data: Partial<VCardData>
  onChange: (data: Partial<VCardData>) => void
}

export function VCardForm({ data, onChange }: VCardFormProps) {
  const handleChange = (field: keyof VCardData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [field]: e.target.value })
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={data.firstName || ''}
          onChange={handleChange('firstName')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={data.lastName || ''}
          onChange={handleChange('lastName')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile</Label>
        <Input
          id="mobile"
          type="tel"
          value={data.mobile || ''}
          onChange={handleChange('mobile')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fax">Fax</Label>
        <Input
          id="fax"
          type="tel"
          value={data.fax || ''}
          onChange={handleChange('fax')}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email || ''}
          onChange={handleChange('email')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={data.company || ''}
          onChange={handleChange('company')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          id="jobTitle"
          value={data.jobTitle || ''}
          onChange={handleChange('jobTitle')}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input
          id="street"
          value={data.street || ''}
          onChange={handleChange('street')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={data.city || ''}
          onChange={handleChange('city')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          value={data.state || ''}
          onChange={handleChange('state')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="zip">ZIP Code</Label>
        <Input
          id="zip"
          value={data.zip || ''}
          onChange={handleChange('zip')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={data.country || ''}
          onChange={handleChange('country')}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          value={data.website || ''}
          onChange={handleChange('website')}
          placeholder="https://"
        />
      </div>
    </div>
  )
}

