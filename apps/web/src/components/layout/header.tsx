"use client";

import Link from "next/link";
import { env } from "@/env";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png" 
              alt="Logo"
              width={32}
              height={32}
              className="rounded-md"
            />

            <p className="mb-0.5 font-semibold text-white text-xl">
              {env.NEXT_PUBLIC_HOSTNAME}
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}
