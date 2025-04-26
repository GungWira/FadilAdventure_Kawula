"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import z from "zod";
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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import Loading from "@/components/loading/loading";

const formSchema = z.object({
  file_video: z.any(),
  title: z.string(),
  description: z.string(),
  culture: z.enum(["Budaya Bali", "Budaya Jawa"]),
});

export default function ProfileForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      !values.file_video ||
      !values.title ||
      !values.description ||
      !values.culture
    ) {
      console.error("Form incomplete!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("video_url", values.file_video[0]);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("type", JSON.stringify([values.culture]));

      const response = await fetch("/api/video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server error:", text);
        return;
      }

      const result = await response.json();
      if (result) {
        toast.success("Video berhasil diupload!");
        form.reset();
        setPreviewImage(null);
      }
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Gagal mengupload video!");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col justify-center items-center w-full gap-2 mb-6">
        <h1 className="text-4xl font-semibold text-center">Buat Konten</h1>
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
                  <div className="w-full relative flex justify-center items-center overflow-hidden aspect-video rounded-md">
                    <FormControl className="opacity-0 absolute z-10 w-full h-full">
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewImage(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                            field.onChange(e.target.files); // penting!
                          }
                        }}
                      />
                    </FormControl>
                    <div className="relative w-full aspect-video">
                      {previewImage ? (
                        <video
                          src={previewImage}
                          controls
                          className="w-full h-auto object-cover"
                        />
                      ) : (
                        <div className="flex justify-center items-center w-full h-full bg-gray-100">
                          <span>Upload Video</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* JUDUL */}
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

            {/* DESKRIPSI */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Video</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan deskripsi video" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BUDAYA */}
            <FormField
              control={form.control}
              name="culture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Budaya</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih budaya" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Budaya Bali">Budaya Bali</SelectItem>
                      <SelectItem value="Budaya Jawa">Budaya Jawa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SUBMIT */}
            <div className="flex justify-end">
              <Button type="submit" variant={"blue"}>
                Unggah Konten
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
