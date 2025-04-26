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

export default function CarouselContents() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full  "
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
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
                  <h3 className="font-medium mb-1">
                    Ep {index + 1} - Kata dasar
                  </h3>
                  <p className="text-sm text-gray-600">
                    Belajar kata dasar dalam bahasa Bali
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
