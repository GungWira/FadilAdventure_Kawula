"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import * as z from "zod"; // <- ini harus *import * as z* bukan import default
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import Loading from "@/components/loading/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  file_video: z.any(),
  title: z.string(),
  description: z.string(),
  culture: z.enum(["Budaya Bali", "Budaya Jawa"]),
});

export default function ProfileForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (user && user.id) {
    redirect("/culture");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      culture: undefined,
    },
  });

  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values);
    setLoading(true);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="container mx-auto py-4">
        <div className="flex flex-col justify-center items-center w-full gap-2 mb-6">
          <h1 className="text-center scroll-m-20 text-4xl font-semibold tracking-tight lg:text-3xl">
            Buat Konten
          </h1>
          <p>
            Isi kolom yang sudah disediakan dan unggah video pembelajaran secara
            digital!
          </p>
        </div>

        <div className="flex justify-center items-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-1/2"
            >
              {/* VIDEO */}
              <FormField
                control={form.control}
                name="file_video"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-center items-center">
                    <FormLabel>Video Pembelajaran</FormLabel>
                    <div className="w-full relative flex justify-center items-center overflow-hidden aspect-video rounded-md max-w-108">
                      <FormControl className="opacity-0 absolute z-10 w-full h-full">
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setPreviewVideo(url);
                              field.onChange(file); // <- set file ke react hook form
                            }
                          }}
                        />
                      </FormControl>
                      <div className="relative w-full aspect-video">
                        {previewVideo ? (
                          <video
                            src={previewVideo}
                            controls
                            className="w-full h-auto object-cover"
                          />
                        ) : (
                          <div className="flex justify-center items-center w-full h-full bg-gray-100 text-gray-400">
                            Upload Video
                          </div>
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Judul Video */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Video</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan judul video" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Deskripsi Video */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Video</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan deskripsi video"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Jenis Budaya */}
              <FormField
                control={form.control}
                name="culture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Budaya</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih budaya" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Budaya Bali">Budaya Bali</SelectItem>
                        <SelectItem value="Budaya Jawa">Budaya Jawa</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end justify-end">
                <Button type="submit" variant={"blue"}>
                  Unggah Konten
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
