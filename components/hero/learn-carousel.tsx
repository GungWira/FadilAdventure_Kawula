import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-100 rounded-xl overflow-hidden">
                        <div className="relative h-40 bg-indigo-600 p-4">
                            <div className="absolute inset-0 bg-indigo-500 opacity-50">
                                <div className="h-full w-full flex flex-wrap content-center justify-center opacity-20">
                                    {[...Array(9)].map((_, i) => (
                                        <div key={i} className="m-1 w-6 h-6">
                                            {i % 3 === 0 ? (
                                                <div className="w-full h-full rounded-full bg-indigo-300"></div>
                                            ) : i % 3 === 1 ? (
                                                <div className="w-full h-full transform rotate-45 bg-indigo-300"></div>
                                            ) : (
                                                <div className="w-full h-full transform rotate-45 bg-indigo-300"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Carousel>
                                <CarouselContent>
                                    <CarouselItem>...</CarouselItem>
                                    <CarouselItem>...</CarouselItem>
                                    <CarouselItem>...</CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>

                            <div className="relative z-10 h-full flex justify-center items-center">
                                <Image
                                    src="/lesson-img.webp"
                                    alt="Learning illustration"
                                    width="100"
                                    height="100"
                                    className=" w-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium mb-1">Ep 1 - Kata dasar</h3>
                            <p className="text-sm text-gray-600">Belajar kata dasar dalam bahasa Bali</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
