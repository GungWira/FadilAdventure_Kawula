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
import { useAuth } from "@/context/AuthContext";

export default function CarouselContents() {
  const { user } = useAuth();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      if (user) {
        try {
          console.log(user.user_id);
          const res = await fetch("/api/kreator", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.user_id }),
          });
          const result = await res.json();
          console.log(result);
          if (!result) {
            setDatas([]);
          } else {
            setDatas(result);
          }
        } catch (error) {}
      }
    };

    fetchVideo();
  }, [user]);

  if (datas.length <= 0) {
    return (
      <div className="w-full flex justify-start items-start">
        <p className="opacity-70 text-base">
          Yahh, belum ada konten yang kamu upload
        </p>
      </div>
    );
  }

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
              <Link href={"/"}>
                <Image
                  src={`/lesson-bg-${index + 1}.png`}
                  alt="Learning illustration"
                  width="300"
                  height="300"
                  className=" w-full object-cover aspect-square rounded-2xl bg-indigo-300"
                />
                <div className="mt-4">
                  <h3 className="font-medium mb-1">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.description}</p>
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
