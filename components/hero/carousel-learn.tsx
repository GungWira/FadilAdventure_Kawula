"use client"; // WAJIB: supaya bisa pakai useState, useEffect

import { useEffect, useState } from "react";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading/loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselSize() {
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchChapters() {
      setLoading(true);
      const res = await fetch("/api/chapters/many", {
        method: "GET",
      });
      const data = await res.json();
      setChapters(data[0].episodes);
      setLoading(false);
    }

    fetchChapters();
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="">
      <pre></pre>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {chapters.map((chapter, index) => (
            <CarouselItem
              key={chapter.id || index}
              className="md:basis-2/4 lg:basis-56"
            >
              <div>
                <Link href={`/teste/${chapter.id}`}>
                  <Image
                    src={chapter.imageUrl || "/lesson-bg.png"} // fallback kalau tidak ada gambar
                    alt={chapter.title || "Chapter"}
                    width="200"
                    height="100"
                    className="w-full object-cover aspect-square rounded-xl bg-indigo-300"
                  />
                  <div className="mt-4">
                    <h3 className="font-medium mb-1">{chapter.title}</h3>
                    <p className="text-sm text-gray-600">
                      {chapter.description}
                    </p>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
