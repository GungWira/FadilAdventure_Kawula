"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

export default function AuthButton() {
  const { user } = useAuth();

  if (user == null) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Button asChild variant={"outline"}>
              <Link href="/sign-in">Masuk</Link>
            </Button>
            <Button asChild variant={"blue"}>
              <Link href="/sign-up">Daftar</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-end items-center gap-2">
      <div className="flex flex-col justify-start items-end">
        <p>Wiradarma</p>
        <div className="w-full max-w-xl h-[6px] flex justify-end rounded-full my-1 bg-[#E2E2EB] overflow-hidden">
          <div className={`flex h-full w-1/2 bg-[#5956EB]`}></div>
        </div>
      </div>
      <Avatar>
        <AvatarImage
          src={user.profile_image || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>
    </div>
  );
}
