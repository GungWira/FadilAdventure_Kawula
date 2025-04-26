"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Progress } from "../ui/progress"
import { ChevronLeft } from "lucide-react"
import { useParams } from "next/navigation"
interface QuizResultsProps {
    score: number;
    total: number;
}
interface LearnWord {
    learnWord: string
}

interface ChaptersProp {
    name: string,
  }
export default function QuizResults({ score, total }: QuizResultsProps) {
    const totalProgress = (score / total) * 100
    const [learnWord, setLearnword] = useState<LearnWord>()
    const params = useParams()
   const [chapters, setChapters] = useState<any[]>([])
  
    useEffect(() => {
      async function fetchChapters() {
        const res = await fetch('/api/chapters/many', {
          method: "GET"
        })
        const data = await res.json()
        console.log(data[0].episodes)
        setChapters(data[0].episodes)
      }
  
      fetchChapters()
    }, [])
    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-3xl mx-auto p-4">
                <div className="bg-white rounded-3xl p-8 mt-20 mb-8 flex flex-col items-center">

                    <h1 className="text-4xl font-bold mb-1">
                        YEY! <span className="text-yellow-400">+20 EXP</span>
                    </h1>

                    <p className="text-center text-gray-600 mb-10">
                        Kamu telah menyelesaikan seluruh
                        <br />
                        materi & latihan di chapter 1
                    </p>

                    <div className="w-full">
                        <h2 className="font-bold text-xl mb-4">Ringkasan</h2>

                        <div className="space-y-4 mb-8">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Materi</span>
                                    <span>100%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-400 w-full"></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Latihan</span>
                                    <span>{Math.round(totalProgress)}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <Progress value={totalProgress} />
                                </div>
                            </div>
                        </div>

                        <h2 className="font-bold text-xl mb-4">Kata dipelajari</h2>

                        <div className="space-y-2 mb-8">
                            <p>Ngajeng, Kuluk, Mai, Ngidih, Meli</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 w-full">
                    <Link href="/">
                        <Button variant="outline" className="bg-white">
                            Beranda
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant={'blue'}>Chapter Selanjutnya</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
