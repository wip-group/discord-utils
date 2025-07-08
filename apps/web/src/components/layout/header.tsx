"use client";

import Link from "next/link";
import { env } from "@/env";


export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 items-center px-4 sm:container">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded bg-primary">
              <span className="font-bold text-lg text-primary-foreground">
                {env.NEXT_PUBLIC_PROJECT_NAME.slice(0, 1)}
              </span>
            </div>
            <p className="mb-0.5 font-semibold text-white text-xl">
              {env.NEXT_PUBLIC_HOSTNAME}
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}
