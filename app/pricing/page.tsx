
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Crown,
  Star,
  Sparkles,
  Volume2,
  Film,
  BookOpen,
  ThumbsUp,
  Zap,
} from "lucide-react";

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(false);

  const plans = [
    {
      name: "Freemium",
      description: "Untuk pemula yang ingin mencoba aplikasi kami",
      price: annualBilling ? "Gratis" : "Gratis",
      discount: "",
      features: [
        { name: "5 chapter per hari", available: true, icon: BookOpen },
        { name: "Akses materi dasar", available: true, icon: ThumbsUp },
        { name: "Kuis basic", available: true, icon: Star },
        { name: "Iklan muncul", available: false, icon: X },
        { name: "Video budaya terbatas", available: true, icon: Film },
        { name: "Mode latihan offline", available: false, icon: X },
      ],
      popular: false,
      buttonText: "Daftar Sekarang",
      buttonVariant: "outline",
    },
    {
      name: "Premium",
      price: annualBilling ? "Rp 237.000" : "Rp 30.000",
      period: annualBilling ? "/tahun" : "/bulan",
      discount: annualBilling ? "Hemat 34%" : "",
      description: "Untuk pengguna yang serius belajar budaya lokal",
      features: [
        { name: "Chapter tak terbatas", available: true, icon: BookOpen },
        { name: "Akses semua materi", available: true, icon: ThumbsUp },
        { name: "Semua kuis & tantangan", available: true, icon: Star },
        { name: "Bebas iklan", available: true, icon: Zap },
        { name: "Video budaya lengkap", available: true, icon: Film },
        { name: "Mode latihan offline", available: true, icon: Volume2 },
      ],
      popular: true,
      buttonText: "Berlangganan Sekarang",
      buttonVariant: "default",
    },
    {
      name: "Premium Plus",
      price: annualBilling ? "Rp 356.000" : "Rp 45.000",
      period: annualBilling ? "/tahun" : "/bulan",
      discount: annualBilling ? "Hemat 38%" : "",
      description: "Pengalaman belajar terbaik dengan fitur eksklusif",
      features: [
        { name: "Chapter tak terbatas", available: true, icon: BookOpen },
        { name: "Akses semua materi premium", available: true, icon: ThumbsUp },
        { name: "Kuis premium & sertifikat", available: true, icon: Star },
        { name: "Bebas iklan", available: true, icon: Zap },
        { name: "Video budaya eksklusif", available: true, icon: Film },
        { name: "Mentor pribadi", available: true, icon: Sparkles },
      ],
      popular: false,
      buttonText: "Dapatkan Premium Plus",
      buttonVariant: "default",
    },
  ];

  return (
    <div className="container flex flex-col items-center py-12 px-4 md:px-6 bg-white">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#5956EB]">
          Pilih Paket Belajar Budaya Lokal
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
          Jelajahi kekayaan budaya Indonesia dengan cara yang menyenangkan!
          Pilih paket yang sesuai dengan kebutuhan belajarmu.
        </p>
        <div className="flex items-center justify-center space-x-2 mt-6">
          <span
            className={`text-sm ${!annualBilling ? "font-medium text-[#5956EB]" : "text-gray-500"}`}
          >
            Bulanan
          </span>
          <button
            onClick={() => setAnnualBilling(!annualBilling)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 ${
              annualBilling ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                annualBilling ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm ${annualBilling ? "font-medium text-[#5956EB]" : "text-gray-500"}`}
          >
            Tahunan
            <Badge
              variant="outline"
              className="ml-2 bg-blue-50 text-[#5956EB] border-blue-100"
            >
              Hemat 30%+
            </Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 w-full max-w-6xl">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col h-full border-2 ${
              plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
            }`}
          >
            <CardHeader className="flex flex-col space-y-1.5 py-6">
              <CardTitle className="text-2xl font-bold text-center text-[#5956EB] flex items-center justify-center gap-2">
                {plan.name === "Premium" && <Crown className="h-5 w-5" />}
                {plan.name === "Premium Plus" && (
                  <Sparkles className="h-5 w-5" />
                )}
                {plan.name}
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 grid gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center">
                  {plan.name !== "Freemium" && (
                    <span className="text-sm font-medium">Rp</span>
                  )}
                  <span className="text-3xl font-bold text-[#5956EB]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-gray-500 ml-1">
                      {plan.period}
                    </span>
                  )}
                </div>
                {plan.discount && (
                  <p className="text-sm font-medium text-blue-500 mt-1">
                    {plan.discount}
                  </p>
                )}
              </div>
              <ul className="space-y-3 mt-4">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-start gap-2">
                    {feature.available ? (
                      <Check className="h-5 w-5 text-blue-500 shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 shrink-0" />
                    )}
                    <span
                      className={
                        feature.available ? "text-gray-600" : "text-gray-400"
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-4 pb-8">
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : plan.buttonVariant === "outline"
                      ? "bg-white hover:bg-gray-100 text-blue-600 border-blue-600"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                variant={"blue"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

}
