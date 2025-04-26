'use client'
import { useState } from 'react'

export function WordOrder({ question, submitAnswer }: { question: any, submitAnswer: (isCorrect: boolean) => void }) {
  const [words, setWords] = useState<string[]>(shuffleArray(question.options))

  function shuffleArray(array: string[]) {
    return [...array].sort(() => Math.random() - 0.5)
  }

  function handleClick(word: string) {
    setWords(prev => prev.filter(w => w !== word))
  }

  function handleSubmit() {
    const isCorrect = JSON.stringify(words) === JSON.stringify(question.correct_answer)
    submitAnswer(isCorrect)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {words.map((word, idx) => (
          <button key={idx} onClick={() => handleClick(word)} className="p-2 bg-gray-200 rounded-lg">
            {word}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit} className="p-2 bg-green-500 text-white rounded-lg">
        Submit
      </button>
    </div>
  )
}
