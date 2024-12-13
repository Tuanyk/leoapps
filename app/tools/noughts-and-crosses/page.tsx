import type { Metadata } from 'next'
import NoughtsAndCrosses from './NoughtsAndCrosses'
import { BASE_URL } from '../../utils/config';


export const metadata: Metadata = {
  title: 'Customizable Noughts and Crosses | Fun Online Game',
  description: 'Play the classic game of Noughts and Crosses (Tic-Tac-Toe) online with customizable board size. Challenge your friends or play against yourself in this engaging game.',
  alternates: {
      canonical: `${BASE_URL}/tools/noughts-and-crosses`,
  }
}

export default function NoughtsAndCrossesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Customizable Noughts and Crosses</h1>
      <NoughtsAndCrosses />
    </div>
  )
}

