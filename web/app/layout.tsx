import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kids Gym — Lesson Planner",
  description: "Curriculum map, lesson planning, and lesson library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${geist.className} bg-zinc-50 text-zinc-900 min-h-full`}>
        <nav className="border-b bg-white px-6 py-3 flex items-center gap-6 text-sm font-medium sticky top-0 z-10">
          <Link href="/" className="text-base font-bold tracking-tight">Kids Gym</Link>
          <Link href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">Curriculum</Link>
          <Link href="/lessons" className="text-zinc-500 hover:text-zinc-900 transition-colors">Lessons</Link>
          <Link href="/plan" className="text-zinc-500 hover:text-zinc-900 transition-colors">Plan lesson</Link>
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
