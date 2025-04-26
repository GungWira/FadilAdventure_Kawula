import React from "react";
import { Button } from "../ui/button";
import CarouselLearn from "./carousel-content";

export default function LatestContent() {
  return (
    <section className="container mx-auto px-4 lg:px-0 mt-12">
      <Button className="px-6 py-2 bg-[url('/bg-button.png')] bg-contain bg-[#7E80D8] hover:scale-95 ease-in-out hover:bg-[#7E80D8]  text-white font-medium mb-4">
        Konten Terbaru
      </Button>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Konten yang Baru Kamu Buat</h2>
      </div>

      <CarouselLearn />
    </section>
  );
}
