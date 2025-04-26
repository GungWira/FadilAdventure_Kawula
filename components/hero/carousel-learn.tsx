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
                <Link href={`/lesson/${chapter.id}`}>
                  <Image
                    src={chapter.imageUrl || "/lesson-bg.png"} // fallback kalau tidak ada gambar
                    alt={chapter.title || "Chapter"}
                    width="200"
                    height="100"
                    className="w-full object-cover aspect-square rounded-xl bg-indigo-300"
                  />
                  <div className="mt-4">
                    <h3 className="font-medium mb-1">{chapter.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {chapter.description}
                    </p>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
          <CarouselItem className="md:basis-2/4 lg:basis-56">
            <div>
              <Link href={`/`}>
                <Image
                  src={"/lesson-bg-2.png"}
                  alt={"Chapter"}
                  width="200"
                  height="100"
                  className="w-full object-cover aspect-square rounded-xl bg-indigo-300"
                />
                <div className="mt-4">
                  <h3 className="font-medium mb-1">Ep 2 - Kata Sapaan</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Belajar berbagai jenis Kata Sapaan dalam bahasa Bali
                  </p>
                </div>
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-2/4 lg:basis-56">
            <div>
              <Link href={`/`}>
                <Image
                  src={"/lesson-bg-3.png"}
                  alt={"Chapter"}
                  width="200"
                  height="100"
                  className="w-full object-cover aspect-square rounded-xl bg-indigo-300"
                />
                <div className="mt-4">
                  <h3 className="font-medium mb-1">Ep 3 - Kata Kerja</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Belajar berbagai jenis Kata Kerja dalam bahasa Bali
                  </p>
                </div>
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-2/4 lg:basis-56">
            <div>
              <Link href={`/`}>
                <Image
                  src={"/lesson-bg-4.png"}
                  alt={"Chapter"}
                  width="200"
                  height="100"
                  className="w-full object-cover aspect-square rounded-xl bg-indigo-300"
                />
                <div className="mt-4">
                  <h3 className="font-medium mb-1">Ep 4 - Kalimat Aktif</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Belajar berbagai jenis Kalimat Aktif dalam bahasa Bali
                  </p>
                </div>
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-2/4 lg:basis-56">
            <div>
              <Link href={`/`}>
                <Image
                  src={"/lesson-bg-5.png"}
                  alt={"Chapter"}
                  width="200"
                  height="100"
                  className="w-full object-cover aspect-square rounded-xl bg-indigo-300"
                />
                <div className="mt-4">
                  <h3 className="font-medium mb-1">Ep 5 - Kalimat Pasif</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Belajar berbagai jenis Kalimat Pasif dalam bahasa Bali
                  </p>
                </div>
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-2/4 lg:basis-56">
            <div>
              <Link href={`/`}>
                <Image
                  src={"/lesson-bg-2.png"}
                  alt={"Chapter"}
                  width="200"
                  height="100"
                  className="w-full object-cover aspect-square rounded-xl bg-indigo-300"
                />
                <div className="mt-4">
                  <h3 className="font-medium mb-1">Ep 6 - Kata Sapaan</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Belajar berbagai jenis Kata Sapaan dalam bahasa Bali
                  </p>
                </div>
              </Link>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
