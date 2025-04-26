import React, { ReactNode } from 'react'

interface QuizLayoutProps {
    children: ReactNode
}

export default function QuizLayout({children}: QuizLayoutProps) {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}
