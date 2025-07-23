"use client"

import { Button } from "@/components/ui/button"

type KeypadProps = {
  onKeyPress: (key: string) => void
  onDelete: () => void
  onClear: () => void
}

export function Keypad({ onKeyPress, onDelete, onClear }: KeypadProps) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

  return (
    <div className="grid grid-cols-3 gap-2">
      {keys.map((key) => (
        <Button
          key={key}
          onClick={() => onKeyPress(key)}
          variant="outline"
          className="h-20 text-2xl font-bold"
          aria-label={`Number ${key}`}
        >
          {key}
        </Button>
      ))}
      <Button
        onClick={onClear}
        variant="outline"
        className="h-20 text-lg font-bold"
        aria-label="Clear"
      >
        Clear
      </Button>
      <Button
        onClick={() => onKeyPress("0")}
        variant="outline"
        className="h-20 text-2xl font-bold"
        aria-label="Number 0"
      >
        0
      </Button>
      <Button
        onClick={onDelete}
        variant="outline"
        className="h-20 text-lg font-bold"
        aria-label="Delete"
      >
        &larr;
      </Button>
    </div>
  )
}
