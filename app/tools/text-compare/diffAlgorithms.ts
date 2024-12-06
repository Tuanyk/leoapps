import { diffChars, diffWords, Change } from 'diff'

interface SideBySideDiff {
  left: string
  right: string
  changed: boolean
}

export function johnResigDiff(text1: string, text2: string): Change[] {
  return diffChars(text1, text2)
}

export function snowtideDiff(text1: string, text2: string): Change[] {
  return diffWords(text1, text2)
}

export function snowtideSideBySideDiff(text1: string, text2: string): SideBySideDiff[] {
  const changes = diffWords(text1, text2)
  
  const result: SideBySideDiff[] = []

  changes.forEach(change => {
    const words = change.value.split(/\s+/).filter(w => w.length > 0)
    if (change.added) {
      words.forEach(word => {
        result.push({ left: '', right: word, changed: true })
      })
    } else if (change.removed) {
      words.forEach(word => {
        result.push({ left: word, right: '', changed: true })
      })
    } else {
      words.forEach(word => {
        result.push({ left: word, right: word, changed: false })
      })
    }
  })

  return result
}

