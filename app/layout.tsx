"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { SidebarNav } from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

const sidebarNavItems = [
  {
    title: "Chat",
    href: "/",
  },
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Admin",
    href: "/admin",
  },
  {
    title: "Bookmarks",
    href: "/bookmarks",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  // Run only once after the component has mounted
  useEffect(() => {
    // Set the flag to true to indicate this is now client-side
    setIsClient(true);
  }, []);

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
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-5xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
