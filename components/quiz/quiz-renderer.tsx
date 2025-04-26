import { WordOrder } from './word-order'

export function QuizRenderer({ question, submitAnswer }: { question: any, submitAnswer: (isCorrect: boolean) => void }) {
  if (question.type === 'multiple_choice') {
    return (
      <div className="grid gap-4">
        
        {question.options.map((opt: string, idx: number) => (
          <button key={idx} onClick={() => submitAnswer(opt === question.correct_answer)} className="p-4 bg-blue-500 text-white rounded-xl">
            {opt}
          </button>
        ))}
      </div>
    )
  }

  if (question.type === 'choose_image') {
    return (
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((imgUrl: string, idx: number) => (
          <button key={idx} onClick={() => submitAnswer(imgUrl === question.correct_answer)}>
            <img src={imgUrl} alt="" className="rounded-xl" />
          </button>
        ))}
      </div>
    )
  }

  if (question.type === 'word_order') {
    return <WordOrder question={question} submitAnswer={submitAnswer} />
  }

  return <p>Unsupported question type.</p>
}
