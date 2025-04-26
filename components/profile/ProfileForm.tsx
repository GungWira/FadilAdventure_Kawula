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
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

const formSchema = z.object({
  profile_picture: z.any(),
  nama_lengkap: z.string(),
  nama_panggilan: z.string(),
  umur: z.string(),
});

export default function ProfileForm() {
  const { user, login } = useAuth();

  if (user && user.id) {
    redirect("/culture");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_lengkap: "",
      nama_panggilan: "",
      umur: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await login(
      values.nama_lengkap,
      values.nama_panggilan,
      parseInt(values.umur, 10)
    );
    if (res && res.status == 200) {
      redirect("/culture");
    }
  }

  return (
    <div>
      <div className="container mx-auto py-4">
        <div className="flex flex-col justify-center items-center w-full gap-2 mb-6">
          <h1 className="text-center scroll-m-20 text-4xl font-semibold tracking-tight lg:text-3xl">
            Selesaikan profilmu
          </h1>
          <p>Yuk lengkapin profil kamu biar kita saling kenal!</p>
        </div>

        <div className="flex justify-center items-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-1/2"
            >
              {/* PROFILE */}
              <FormField
                control={form.control}
                name="profile_picture"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-center items-center">
                    <FormLabel>Foto Profil</FormLabel>
                    <div className="w-full relative flex justify-center items-center overflow-hidden aspect-square rounded-full max-w-32">
                      <FormControl className="opacity-0 absolute z-10 w-full h-full">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setPreviewImage(reader.result as string);
                              };
                              reader.readAsDataURL(file);

                              field.onChange(e);
                            }
                          }}
                        />
                      </FormControl>
                      <div className="relative w-full aspect-square">
                        <Image
                          src={previewImage || "/photo-profile.webp"}
                          alt="Preview"
                          width={80}
                          height={80}
                          className="w-full h-auto rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nama Lengkap */}
              <FormField
                control={form.control}
                name="nama_lengkap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nama Panggilan */}
              <FormField
                control={form.control}
                name="nama_panggilan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Panggilan</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama panggilan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Umur */}
              <FormField
                control={form.control}
                name="umur"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Umur</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan umur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end justify-end">
                <Button type="submit" variant={"blue"}>
                  Next
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
