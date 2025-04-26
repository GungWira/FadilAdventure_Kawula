import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import CarouselLearn from './carousel-learn'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
export default function LearnCarousel() {
  return (
    <section className="container mx-auto px-4 lg:px-0 mt-8">
        <Button className="px-6 py-2 bg-[url('/bg-button.png')] bg-contain bg-[#7E80D8] hover:scale-95 ease-in-out hover:bg-[#7E80D8]  text-white font-medium mb-4">Bahasa</Button>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Chapter 1 - Pengenalan</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">48%</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-indigo-600 rounded-full"></div>
            </div>
          </div>
        </div>

          <CarouselLearn/>
      </section>
  )
}
