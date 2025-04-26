"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";

export default function CarouselStream() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/video", {
        method: "GET",
      });
      const result = await res.json();
      setDatas(result);
    };

    fetchData();
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {datas.map((data: any, index) => (
          <CarouselItem key={index} className="md:basis-2/4 lg:basis-56">
            <div>
              <Link href={"/stream/" + data.id}>
                <Image
                  src={`/thumbnail-${index + 1}.png`}
                  alt="Learning illustration"
                  width="200"
                  height="100"
                  className=" w-full object-cover aspect-video rounded-xl bg-indigo-300"
                />
                <div className="mt-4">
                  <h3 className="font-medium mb-1">{data.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {data.description}
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
  );
}
