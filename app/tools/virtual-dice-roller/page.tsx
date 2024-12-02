import { Metadata } from 'next'
import VirtualDiceRoller from './VirtualDiceRoller'
import { BASE_URL } from '../../utils/config';

export const metadata: Metadata = {
  title: 'Virtual Dice Roller | Roll Multiple 6-Sided Dice Online',
  description: 'Roll multiple 6-sided virtual dice online with our Virtual Dice Roller. Choose the number of dice to roll, see the rolling animation, and get individual results and sum.',
  openGraph: {
    title: 'Virtual Dice Roller | Roll Multiple 6-Sided Dice Online',
    description: 'Roll multiple 6-sided virtual dice online with our Virtual Dice Roller. Choose the number of dice to roll, see the rolling animation, and get individual results and sum.',
    url: `${BASE_URL}/tools/virtual-dice-roller`,
    siteName: 'Leonardo Tools',
    locale: 'en_US',
    type: 'website',
  },
}

export default function VirtualDiceRollerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Virtual Dice Roller</h1>
      <VirtualDiceRoller />
    </div>
  )
}

