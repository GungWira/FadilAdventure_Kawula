'use client'

import { useState, useEffect } from 'react'
import { QuizRenderer } from '@/components/quiz/quiz-renderer'
import { useParams } from 'next/navigation'

export default function QuizPage() {
  const [question, setQuestion] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  console.log("value ", params.id)

  async function fetchQuestion() {
    setLoading(true)
    const res = await fetch('/episodes', {  
      method: "GET"
    })
    const data = await res.json()
    console.log(data)
    setQuestion(data.question)
    setLoading(false)
  }

  useEffect(() => {
    async function fetchQuestion() {
      setLoading(true)
      const res = await fetch('/api/episodes', {
        method: "POST",
        body: JSON.stringify({
          questionId: ""
        }),
        headers: {
          "Content-Type":"application/json"
        }
      })
      const data = await res.json()
      console.log(data);
      
      setQuestion(data.question)
      setLoading(false)
    }
    fetchQuestion()
  }, [])


  if (loading) return <p>Loading...</p>
  if (!question) return <p>No questions available.</p>

  return (
    <div className="p-8">
      <QuizRenderer question={question} submitAnswer={submitAnswer} />
    </div>
  )
}

