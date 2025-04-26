"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  return (
    <div className=" min-h-screen">
      <div className="container px-4 py-16 md:py-24 mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-blue-950 mb-4">
            Pilih Paket yang Tepat untuk Petualangan Budayamu!
          </h1>
          <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto">
            Jelajahi kekayaan bahasa dan budaya Nusantara dengan cara yang menyenangkan dan interaktif. Temukan paket
            yang sesuai dengan kebutuhanmu!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Paket Freemium */}
          <Card className="border-blue-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-blue-800">Penjelajah Pemula</CardTitle>
              <CardDescription className="text-blue-600 font-medium">Mulai petualanganmu tanpa biaya</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-blue-900">Gratis</span>
                <span className="text-blue-600 ml-1">selamanya</span>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Akses ke 5 chapter setiap hari</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Kuis dasar bahasa lokal</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Akses ke forum komunitas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Tampilan dengan iklan</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Mulai Sekarang</Button>
            </CardFooter>
          </Card>

          {/* Paket Premium */}
          <Card className="border-blue-400 shadow-xl relative hover:shadow-2xl transition-shadow">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <Badge className="bg-blue-600 hover:bg-blue-600 text-white px-4 py-1 text-sm">Paling Populer</Badge>
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-blue-800">Petualang Budaya</CardTitle>
              <CardDescription className="text-blue-600 font-medium">Pengalaman belajar tanpa batas</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-blue-900">Rp49.000</span>
                <span className="text-blue-600 ml-1">/bulan</span>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Chapter tak terbatas setiap hari</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Bebas iklan sepenuhnya</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Akses ke video pembelajaran tarian daerah</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Kuis interaktif budaya dan bahasa</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Mode offline untuk belajar di mana saja</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-700 hover:bg-blue-800">Berlangganan Sekarang</Button>
            </CardFooter>
          </Card>

          {/* Paket Ultimate */}
          <Card className="border-blue-300 bg-gradient-to-b from-blue-50 to-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-blue-800">Maestro Nusantara</CardTitle>
              <CardDescription className="text-blue-600 font-medium">
                Pengalaman belajar premium dengan akses eksklusif
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-blue-900">Rp89.000</span>
                <span className="text-blue-600 ml-1">/bulan</span>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Semua fitur Petualang Budaya</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Akses eksklusif ke konten premium</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Kelas virtual dengan pengajar asli</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Koleksi lengkap video musik tradisional</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Sertifikat penyelesaian kursus</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Akses prioritas ke fitur baru</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                Jadi Maestro Sekarang
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Masih Ragu?</h2>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            Jangan khawatir! Mulai saja dengan paket gratis dan rasakan sensasi belajar bahasa dan budaya lokal yang
            menyenangkan. Kamu bisa upgrade kapan saja!
          </p>
          <Button variant="outline" className="border-blue-500 text-blue-700 hover:bg-blue-50">
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </div>
  )
}
