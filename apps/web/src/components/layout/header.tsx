"use client";

import { UserButton } from "@daveyplate/better-auth-ui";
import { Button } from "@repo/ui/components/button";
import { LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

export default function Header({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto grid h-16 grid-cols-3 items-center px-4 sm:container">
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

        {/* Center: Nav links */}
        <nav className="hidden justify-center gap-6 md:flex">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              href={to}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: Controls */}
        <div className="flex items-center justify-end gap-2">
          <Button asChild variant="secondary">
            <Link href="/add">
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Link>
          </Button>

          {isAuthenticated ? (
            <UserButton
              size={"icon"}
              align="end"
              additionalLinks={[
                {
                  href: "/dashboard",
                  label: "Dashboard",
                  icon: <LayoutDashboard className="h-4 w-4" />,
                },
              ]}
            />
          ) : (
            <Button asChild variant="secondary">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
