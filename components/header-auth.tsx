"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function AuthButton() {
  const { user, logout } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

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

  if (user.id == "") {
    return <></>;
  }
  return (
    <div className="relative">
      <div
        className="flex justify-end items-center gap-2 cursor-pointer"
        onClick={() => setShowPopup(!showPopup)}
      >
        <div className="flex flex-col justify-start items-end">
          <p>{user.username}</p>
          <div className="w-full min-w-20 max-w-xl h-[6px] flex justify-end rounded-full my-1 bg-[#E2E2EB] overflow-hidden">
            <div
              className={`flex h-full bg-[#5956EB]`}
              style={{ width: user.xp / 50 + "%" }}
            ></div>
          </div>
        </div>
        <Avatar>
          <AvatarImage
            src={user.profile_image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
      </div>
      {showPopup && (
        <div className="absolute right-0 z-30 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href={"/pricing"}>Jadi premium</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href={"/kreator"}>Kreator</Link>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
