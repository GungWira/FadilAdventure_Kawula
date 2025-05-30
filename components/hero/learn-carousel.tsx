"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import CarouselLearn from "./carousel-learn";
import Loading from "../loading/loading";

interface ChaptersProp {
  name: string;
}
export default function LearnCarousel() {
  const [chapters, setChapters] = useState<ChaptersProp[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchChapters() {
      setLoading(true);
      const res = await fetch("/api/chapters/many", {
        method: "GET",
      });
      const data = await res.json();
      setChapters(data);
      setLoading(false);
    }

    fetchChapters();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="container mx-auto px-4 lg:px-0 mt-12">
      <Button className="px-6 py-2 bg-[url('/bg-button.png')] bg-contain bg-[#7E80D8] hover:scale-95 ease-in-out hover:bg-[#7E80D8]  text-white font-medium mb-4">
        Bahasa
      </Button>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Chapter 1 - {chapters[0]?.name}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">0%</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-1 h-full bg-indigo-600 rounded-full"></div>
          </div>
        </div>
      </div>
      <CarouselLearn />
    </section>
  );
}
