'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Player = 'X' | 'O' | null

const NoughtsAndCrosses = () => {
  const [size, setSize] = useState(3)
  const [board, setBoard] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<Player>(null)
  const [isDraw, setIsDraw] = useState(false)

  useEffect(() => {
    resetGame()
  }, [size])

  const checkWinner = (squares: Player[]): Player => {
    // Check rows
    for (let i = 0; i < size; i++) {
      if (squares[i * size] && squares.slice(i * size, (i + 1) * size).every(cell => cell === squares[i * size])) {
        return squares[i * size]
      }
    }

    // Check columns
    for (let i = 0; i < size; i++) {
      if (squares[i] && Array.from({ length: size }, (_, index) => squares[i + index * size]).every(cell => cell === squares[i])) {
        return squares[i]
      }
    }

    // Check diagonals
    if (squares[0] && Array.from({ length: size }, (_, index) => squares[index * (size + 1)]).every(cell => cell === squares[0])) {
      return squares[0]
    }
    if (squares[size - 1] && Array.from({ length: size }, (_, index) => squares[(index + 1) * (size - 1)]).every(cell => cell === squares[size - 1])) {
      return squares[size - 1]
    }

    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner || isDraw) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true)
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const resetGame = () => {
    setBoard(Array(size * size).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setIsDraw(false)
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10)
    if (newSize >= 3 && newSize <= 10) {
      setSize(newSize)
    }
  }

  const renderSquare = (index: number) => (
    <Button
      className={`w-12 h-12 text-lg font-bold ${board[index] === 'X' ? 'text-blue-500' : 'text-red-500'}`}
      onClick={() => handleClick(index)}
      aria-label={`Square ${index + 1}`}
    >
      {board[index]}
    </Button>
  )

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <Label htmlFor="boardSize">Board Size (3-10):</Label>
        <Input
          id="boardSize"
          type="number"
          min="3"
          max="10"
          value={size}
          onChange={handleSizeChange}
          className="w-20 ml-2"
        />
      </div>
      <div className="mb-4">
        {winner ? (
          <p className="text-xl font-semibold">Winner: {winner}</p>
        ) : isDraw ? (
          <p className="text-xl font-semibold">It&apos;s a draw!</p>
        ) : (
          <p className="text-xl font-semibold">Next player: {currentPlayer}</p>
        )}
      </div>
      <div className={`grid gap-2 mb-4`} style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {board.map((_, index) => (
          <div key={index}>{renderSquare(index)}</div>
        ))}
      </div>
      <Button onClick={resetGame}>Reset Game</Button>
      <div className="mt-6 text-sm">
        <h2 className="font-semibold mb-2">Rules:</h2>
        <ul className="list-disc pl-5">
          <li>Players take turns placing their symbol (X or O) on an empty cell.</li>
          <li>The first player to get {size} of their symbols in a row (horizontally, vertically, or diagonally) wins.</li>
          <li>If all cells are filled and no player has won, the game is a draw.</li>
        </ul>
      </div>
    </div>
  )
}

export default NoughtsAndCrosses

