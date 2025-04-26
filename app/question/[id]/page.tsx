'use client'

import { useState, useEffect } from 'react'
import { QuizRenderer } from '@/components/quiz/quiz-renderer'
import { useParams } from 'next/navigation'

export default function QuizPage() {
    const [question, setQuestion] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const params = useParams()

    async function fetchQuestion() {
        setLoading(true)
        const res = await fetch(`/api/questions/${params.id}`, {
            method: "GEt"
        })
        const data = await res.json()
        setQuestion(data.question)
        setLoading(false)
    }

    useEffect(() => {
        fetchQuestion()
    }, [])

    async function submitAnswer(isCorrect: boolean) {
        await fetch('/app/api/quiz/submit', {
            method: 'POST',
            body: JSON.stringify({
                userId: '123',
                questionId: question.id,
                isCorrect
            })
        })


        if (loading) return <p>Loading...</p>
        if (!question) return <p>No questions available.</p>

        return (
            <div className="p-8">
                <QuizRenderer question={question} submitAnswer={submitAnswer} />
            </div>
        )
    }
}
