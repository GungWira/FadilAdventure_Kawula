
import { Geist, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Kawula | Belajar bahasa budaya Indonesia",
  description: "Aplikasi pembelajaran bahasa budaya Indonesia",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <div className="container mx-auto py-4">{children}</div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
