"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
// import { motion } from "framer-motion";

const lessons = [
  { title: "Napi", text: "Apa", audio: "/sound1.mp3", video: "/video1.mp4" },
  {
    title: "Selamat Datang",
    text: "Halo semuanya!",
    audio: "/sound2.mp3",
    video: "/video2.mp4",
  },
  {
    title: "Belajar Bersama",
    text: "Mari kita mulai.",
    audio: "/sound3.mp3",
    video: "/video3.mp4",
  },
];

export default function LessonPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePlay = () => {
    audioRef.current?.play();
    videoRef.current?.play();
    setIsVideoPlaying(true);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetMedia();
    }
  };

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetMedia();
    }
  };

  const resetMedia = () => {
    audioRef.current?.pause();
    videoRef.current?.pause();
    audioRef.current!.currentTime = 0;
    videoRef.current!.currentTime = 0;
    setIsVideoPlaying(false);
  };

  const currentLesson = lessons[currentIndex];

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-8">
      {/* Progress */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div
            className="h-1 bg-indigo-400 rounded-full"
            style={{ width: `${((currentIndex + 1) / lessons.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="w-5 h-5" />
          <h1 className="font-semibold text-lg">Chapter 1 - Pengenalan</h1>
        </div>
        <button className="text-gray-500 text-sm">Materi</button>
      </div>

      {/* Character Image */}
      <div className="flex justify-center mb-6">
        <Image
          src="/character.png"
          alt="Character"
          width={100}
          height={100}
          className="rounded-full bg-indigo-400 p-2"
        />
      </div>

      {/* Card */}
      <div className="relative bg-indigo-500 text-white rounded-3xl p-8 text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
        <p className="text-indigo-200 mb-6">{currentLesson.text}</p>

        {/* Sound Button */}
        <button
          className="absolute bottom-4 right-4 text-white"
          onClick={handlePlay}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5l7 7-7 7M5 5h.01M5 12h.01M5 19h.01"
            />
          </svg>
        </button>

        {/* Audio */}
        <audio ref={audioRef} src={currentLesson.audio} preload="auto" />

        {/* Hidden Video */}
        {isVideoPlaying && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <video ref={videoRef} controls className="w-3/4 rounded-xl">
              <source src={currentLesson.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          className="bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Sebelumnya
        </Button>
        <Button
          className="bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50"
          onClick={handleNext}
          disabled={currentIndex === lessons.length - 1}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
