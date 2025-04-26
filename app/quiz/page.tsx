'use client'

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useParams } from 'next/navigation'


interface Question {
  id: string;
  type: "text-choice" | "word-order" | "image-choice";
  question: string;
  options: string[];
  answer: string | string[];
}

const questions: Question[] = [
  {
    id: "1",
    type: "text-choice",
    question: "Apa ibu kota Indonesia?",
    options: ["Bandung", "Jakarta", "Surabaya", "Medan"],
    answer: "Jakarta",
  },
  {
    id: "2",
    type: "word-order",
    question: "Susun kalimat: (Saya, suka, belajar, coding)",
    options: ["Saya", "belajar", "coding", "suka"],
    answer: ["Saya", "suka", "belajar", "coding"],
  },
  {
    id: "3",
    type: "image-choice",
    question: "Pilih gambar anjing:",
    options: ["/domba.webp", "/anjing.webp", "/sapi.webp", "/babi.webp"],
    answer: "/anjing.webp",
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showCheck, setShowCheck] = useState(false);
  const [disabledWords, setDisabledWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"benar" | "salah" | null>(null);
  const params = useParams()


  const currentQuestion = questions[current];
  const progress = (current / questions.length) * 100;

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(`/api/episodes/${params.id}`)
      const data = await res.json()
      console.log(data)
    }

    fetchQuestions()
  }, [])

  const handleTextChoice = (option: string) => {
    setSelected([option]);
    setShowCheck(true);
  };

  const handleWordOrder = (word: string) => {
    setSelected((prev) => {
      const newSelected = [...prev, word];
      // Kalau semua kata sudah dipilih, baru tampilkan tombol cek jawaban
      if (newSelected.length === currentQuestion.options.length) {
        setShowCheck(true);
      }
      return newSelected;
    });
    setDisabledWords((prev) => [...prev, word]);
  };

  const handleImageChoice = (img: string) => {
    setSelected([img]);
    setShowCheck(true);
  };

  const submitAnswer = () => {
    if (currentQuestion.type === "word-order") {
      if (JSON.stringify(selected) === JSON.stringify(currentQuestion.answer)) {
        setScore((prev) => prev + 1);
        setFeedback("benar");
      } else {
        setFeedback("salah");
      }
    } else {
      if (selected[0] === currentQuestion.answer) {
        setScore((prev) => prev + 1);
        setFeedback("benar");
      } else {
        setFeedback("salah");
      }
    }

    setTimeout(() => {
      nextQuestion();
      setFeedback(null); // reset feedback setelah pindah soal
    }, 1500); // Delay 1.5 detik
  };


  const nextQuestion = () => {
    setTimeout(() => {
      setSelected([]);
      setDisabledWords([]);
      setShowCheck(false);
      setCurrent((prev) => prev + 1);
    }, 500);
  };

  if (current >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold">
          Skor Akhir Kamu: {score}/{questions.length}
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Progress value={progress} className="w-full mb-4" />

      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChevronLeft className="h-5 w-5" />
          <span className="font-bold text-lg">
            {currentQuestion.type === "image-choice"
              ? "Chapter 1 - Pengenalan"
              : currentQuestion.type === "word-order"
                ? "Chapter 1 - Pengenalan"
                : "Chapter 1 - Pengenalan"}
          </span>
        </div>
        <div>
          <span className="text-gray-500">
            {currentQuestion.type === "word-order" ? "Materi" : "Latihan"}
          </span>
        </div>
      </div>

      <div className="w-56 h-56 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-6">
        <Image
          src="/question-girl.webp"
          alt="Character"
          width={300}
          height={120}
          className="object-cover"
        />
      </div>

      <h2 className="text-2xl py-8 font-semibold mb-4 text-center">
        {currentQuestion.question}
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full flex justify-center items-center mx-auto"
        >
          {currentQuestion.type === "text-choice" && (
            <div className="flex gap-4">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleTextChoice(option)}
                  className={`flex text-black text-2xl hover:bg-[#7E80D8]/80 flex-col items-center h-48 w-48 ${selected.includes(option) ? "bg-[#7E80D8]" : "bg-[#7E80D8]/40"
                    }`}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {currentQuestion.type === "word-order" && (
            <div className="flex flex-col gap-4">
              <div className="min-h-[48px] w-full flex flex-wrap gap-2 bg-gray-100 p-2 rounded">
                {selected.map((word, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary text-white rounded-full"
                  >
                    {word}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {currentQuestion.options.map((word) => (
                  <Button
                    key={word}
                    variant="outline"
                    onClick={() => handleWordOrder(word)}
                    disabled={disabledWords.includes(word)}
                  >
                    {word}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {currentQuestion.type === "image-choice" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {currentQuestion.options.map((img) => (
                <Button
                  key={img}
                  variant="outline"
                  onClick={() => handleImageChoice(img)}
                  className={`flex items-center h-48 w-48 ${selected.includes(img) ? "bg-[#7E80D8]" : "bg-[#7E80D8]/40"
                    }`}
                >
                  <Image
                    src={img}
                    alt="option"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </Button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white border shadow-lg p-6 rounded-xl z-50 text-center"
          >
            <h2 className={`text-2xl font-bold ${feedback === "benar" ? "text-green-500" : "text-red-500"}`}>
              {feedback === "benar" ? "Jawaban Benar!" : "Jawaban Salah!"}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>


      <footer className="w-full flex items-center justify-between border-t mx-auto mt-16 text-center text-xs py-16">
        <div className="flex gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
              <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
              <path d="m9 11l3 3L22 4"></path>
            </g>
          </svg>
          <div className="flex flex-col items-start">
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">Excellent</h1>
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">Lanjutkan Streak mu!</h1>
          </div>
        </div>
        {showCheck && (
          <Button onClick={submitAnswer}>
            Cek Jawaban
          </Button>
        )}
      </footer>
    </div>
  );
}
