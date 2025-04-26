"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function Culture() {
  const { user } = useAuth();
  const router = useRouter();

  if (user && user.id && user.culture) {
    redirect("/");
  }

  const [selectedCulture, setSelectedCulture] = useState<
    "Budaya Bali" | "Budaya Jawa" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectCulture = (culture: "Budaya Bali" | "Budaya Jawa") => {
    setSelectedCulture(culture);
  };

  const handleNext = async () => {
    if (!selectedCulture) return;
    try {
      setIsSubmitting(true);
      await setLearningType(user!.user_id, selectedCulture);
      console.log("Tipe pembelajaran disimpan:", selectedCulture);
      router.push("/");
    } catch (error) {
      console.error("Gagal menyimpan tipe pembelajaran:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#5956EB] fixed top-0 left-0 flex justify-center items-start">
      <div className="w-full max-w-5xl flex flex-col justify-start items-start gap-8 mt-12">
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <h1 className="text-white font-semibold text-3xl">Mulai Belajar</h1>
          <p className="text-white opacity-70">
            Pilih satu budaya untuk mulai belajar sekarang!
          </p>
        </div>

        <div className="flex flex-row items-stretch w-full justify-between gap-6">
          {/* Budaya Bali */}
          <div
            onClick={() => handleSelectCulture("Budaya Bali")}
            className={`flex cursor-pointer hover:shadow-lg hover:shadow-white/20 flex-col flex-1 justify-start items-start gap-2 rounded-xl px-6 py-6 transition-all ${
              selectedCulture === "Budaya Bali"
                ? "border-4 border-yellow-400 bg-white"
                : "bg-white"
            }`}
          >
            <h2 className="text-[#020202] font-semibold text-xl">
              Budaya Bali
            </h2>
            <p className="text-[#020202] opacity-70 w-3/4">
              Pelajari bahasa hingga budaya Bali dari dasar yang mudah
            </p>
            <div className="mt-3 flex w-full justify-end items-end">
              <Image
                src={"/bali.webp"}
                alt="bali"
                width={64}
                height={64}
                className="w-16"
              />
            </div>
          </div>

          {/* Budaya Jawa */}
          <div
            onClick={() => handleSelectCulture("Budaya Jawa")}
            className={`flex cursor-pointer hover:shadow-lg hover:shadow-white/20 flex-col flex-1 justify-start items-start gap-2 rounded-xl px-6 py-6 transition-all ${
              selectedCulture === "Budaya Jawa"
                ? "border-4 border-yellow-400 bg-white"
                : "bg-white"
            }`}
          >
            <h2 className="text-[#020202] font-semibold text-xl">
              Budaya Jawa
            </h2>
            <p className="text-[#020202] opacity-70 w-3/4">
              Mulai belajar bahasa hingga budaya Jawa langkah demi langkah
            </p>
            <div className="mt-3 flex w-full justify-end items-end">
              <Image
                src={"/jawa.webp"}
                alt="jawa"
                width={64}
                height={64}
                className="w-16"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between items-start gap-4">
          <p className="text-white opacity-60">
            *Segera Hadir Bahasa Daerah Lainnya!
          </p>
          <Button
            variant={"yellow"}
            disabled={!selectedCulture || isSubmitting}
            onClick={handleNext}
          >
            {isSubmitting ? "Menyimpan..." : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

async function setLearningType(
  userId: string,
  culture: "Budaya Bali" | "Budaya Jawa"
) {
  const res = await fetch("/api/set-culture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      culture,
      user_id: userId,
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Gagal set learning type");
  }
  return res.json();
}
