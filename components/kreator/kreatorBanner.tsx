"use client";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function KreatorBanner() {
  const { user } = useAuth();
  return (
    <section className="container mx-auto px-4 lg:px-0 mt-4">
      <div className="relative bg-indigo-600 rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500 opacity-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="rgba(255,255,255,0.1)"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,170.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-16">
          <div className="md:w-1/2 flex flex-col gap-8">
            <div className="">
              <div className="flex justify-start items-center gap-3">
                <h1 className="text-4xl font-bold text-white mb-4 pt-5">
                  Halo {user ? ", " + user.username : ""}
                </h1>
                <Image
                  src={"/kreator-bandage.svg"}
                  alt="kreator bandage"
                  width={180}
                  height={60}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-white text-xl ">
                Terus berkarya untuk nusa dan bangsa dengan{" "}
                <span className="font-semibold">mudah cepat dan efisien!</span>{" "}
                Ayo buat konten terbaru sekarang juga!
              </p>
            </div>
            <div className="flex gap-4 pb-5">
              <button className="px-6 py-2 bg-yellow-400 rounded-full font-medium">
                <Link href={"/kreator/buat"}>Buat Konten</Link>
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex relative justify-end mt-8 md:mt-0">
            <Image
              src="/ppl-bg.png"
              alt="Learning illustration"
              width={350}
              height={650}
              className="object-contain absolute bottom-0 right-0 top-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
