"use client";

import React from "react";
import { Button } from "../ui/button";
import CarouselStream from "./carousel-stream";
import { useState, useEffect } from "react";

export default function StreamCarousel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stream", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="container mx-auto px-4 lg:px-0 mt-12">
      <Button className="px-6 py-2 bg-[url('/bg-button.png')] bg-contain bg-[#7E80D8] hover:scale-95 ease-in-out hover:bg-[#7E80D8]  text-white font-medium mb-4">
        Tarian
      </Button>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Belajar Menari</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">0%</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-1 h-full bg-indigo-600 rounded-full"></div>
          </div>
        </div>
      </div>

      <CarouselStream />
    </section>
  );
}
