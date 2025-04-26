"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { redirect, useParams } from "next/navigation";

interface Question {
  id: string;
  question: string;
  translate: string;
  options: string[];
  answer: string | string[];
  audio: string;
}

// Ini langsung pake datamu
const questions: Question[] = [
  {
    id: "1",
    question: "Napi",
    translate: "apa",
    options: ["Bandung", "Jakarta", "Surabaya", "Medan"],
    answer: "Jakarta",
    audio: "napi.MP3",
  },
  {
    id: "2",
    question: "Ngajeng",
    translate: "Makan",
    options: ["Saya", "belajar", "coding", "suka"],
    answer: ["Saya", "suka", "belajar", "coding"],
    audio: "ngajeng.MP3",
  },
  {
    id: "3",
    question: "Sampun",
    translate: "Sudah",
    options: ["/domba.webp", "/anjing.webp", "/sapi.webp", "/babi.webp"],
    answer: "/anjing.webp",
    audio: "sampun.MP3",
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState<"benar" | "salah" | null>(null);
  const params = useParams();
  const id = params.id;

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       if (id) {
  //         const response = await fetch("/api/lessons", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ id }),
  //         });
  //         const data = await response.json();
  //         setLessons(data);
  //         console.log(data);
  //       }
  //     };
  //     fetchData();
  //   }, [id]);

  const currentQuestion = questions[current];
  const progress = (current / questions.length) * 100;

  const navigateOrGo = () => {
    setCurrent((prev) => Math.min(prev + 1, questions.length - 1));
    if (current == questions.length - 1) {
      redirect("/quiz/" + id);
    }
  };

  return (
    <div className="w-full">
      <Progress value={progress} className="w-full mb-4" />

      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChevronLeft className="h-5 w-5" />
          <span className="font-bold text-lg">Chapter 1 - Pengenalan</span>
        </div>
        <div>
          <span className="text-gray-500">Materi</span>
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

      <div className="h-56 p-8 flex items-center justify-between text-center bg-[#5956EB] rounded-lg">
        <div className="flex items-start flex-col gap-4">
          <h1 className="mt-10 scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0">
            {currentQuestion?.question}
          </h1>
          <h3 className="scroll-m-20 text-2xl text-muted font-semibold tracking-tight">
            {currentQuestion.translate}
          </h3>
        </div>

        {/* Button suara */}
        <div
          className="bg-white p-6 rounded-full cursor-pointer"
          onClick={() => {
            const audio = new Audio(`/${currentQuestion.audio}`);
            audio.play();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={80}
            height={80}
            viewBox="0 0 24 24"
            className="w-8 h-8 aspect-square"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
            ></path>
          </svg>
        </div>
      </div>

      {/* Feedback Benar/Salah */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white border shadow-lg p-6 rounded-xl z-50 text-center"
          >
            <h2
              className={`text-2xl font-bold ${feedback === "benar" ? "text-green-500" : "text-red-500"}`}
            >
              {feedback === "benar"
                ? "Keren! Jawaban Benar!"
                : "Yahh, Jawaban Salah.."}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="w-full flex items-center mx-auto mt-16 text-center text-xs py-16">
        <div className="flex w-full justify-between items-center gap-4">
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => {
              setCurrent((prev) => Math.max(prev - 1, 0));
            }}
          >
            Sebelumnya
          </Button>

          <Button variant={"blue"} size={"lg"} onClick={navigateOrGo}>
            Selanjutnya
          </Button>
        </div>
      </footer>
    </div>
  );
}
