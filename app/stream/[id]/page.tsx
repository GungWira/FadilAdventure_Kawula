"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Loading from "@/components/loading/loading";

export default function StreamPage() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<null | {
    title: string;
    video_url: string;
    description: string;
  }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const res = await fetch(`/api/stream/${id}`);
        if (!res.ok) throw new Error("Gagal fetch video");
        const data = await res.json();
        setVideo(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchVideo();
    }
  }, [id]);
  if (loading) return <Loading />;
  if (!video) return <div>Video tidak ditemukan.</div>;
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            {/* Navigation */}
            <Link
              href=""
              className="inline-flex items-center gap-2 text-gray-700 mb-4 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-semibold text-xl">{video?.title}</span>
            </Link>

            {/* Video Player */}
            <div className="bg-gray-200 rounded-lg aspect-video mb-6">
              <video
                className="w-full h-full rounded-lg"
                controls
                autoPlay
                poster="/placeholder.svg?height=480&width=854"
              >
                <source src={video?.video_url || "#"} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3">Deskripsi</h2>
              <p className="text-gray-600 text-sm">{video?.description}</p>
            </div>

            {/* Creator */}
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="w-12 h-12 bg-purple-100">
                <AvatarImage
                  src="/placeholder.svg?height=48&width=48"
                  alt="Creator"
                />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Suratma</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Lainnya</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="flex gap-3 group cursor-pointer">
                  <div className="w-32 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                    <Image
                      src="/thumbnail-1.png"
                      width={128}
                      height={80}
                      alt="Thumbnail"
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-purple-600">
                      Video Belajar Lain
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-4 h-4 bg-purple-100 rounded-full overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=16&width=16"
                          width={16}
                          height={16}
                          alt="Creator"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-500">Suratma</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
