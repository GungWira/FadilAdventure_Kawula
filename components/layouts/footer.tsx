"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function footer() {
  const pathname = usePathname();
  const hideNavbar = ["/teste"]; // Pastikan URLmu bener '/teste'

  if (hideNavbar.includes(pathname)) {
    return null;
  }
  return (
    <div>
      <footer className="w-full flex items-center justify-center border-t mx-auto mt-16 text-center text-xs py-5">
        <p className="text-base">
          Made with love by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Kawula
          </a>
        </p>
      </footer>
    </div>
  );
}
