import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });
const navItems = [
  { href: "/lessons/1", title: "Greetings", id: "1" },
  { href: "/lessons/2", title: "Numbers", id: "2" },
  { href: "/lessons/3", title: "Travel", id: "3" },
  { href: "/lessons/4", title: "Food", id: "4" },
  { href: "/lessons/5", title: "Survival", id: "5" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="hidden space-y-6 p-10 pb-16 md:block">
        <nav className="space-y-0.5">
          <Link href="/" passHref>
            <Image src="/LangAILogo.png" alt="Logo" width={150} height={66} />
          </Link>
        </nav>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <div className="pb-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Learn
              </h2>
              <div className="space-y-1">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="/">Playground</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="/notes">Notes</Link>
                </Button>
              </div>
            </div>
            <div className="pb-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Lessons
              </h2>
              <NavBar navItems={navItems} />
            </div>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Account
            </h2>
            <div className="space-y-1">
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/profile">Profile</Link>
              </Button>
            </div>
          </aside>
          <div className="flex-1 lg:max-w-5xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
