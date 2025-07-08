"use client";

import { AuthCard } from "@daveyplate/better-auth-ui";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { env } from "@/env";

const settingsPathNames = ["security", "settings"];

export function AuthView({ pathname }: { pathname: string }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const isSignUp = pathname === "sign-up";
  const isSettings = settingsPathNames.includes(pathname);

  const cardHeader = () => {
    if (pathname === "sign-in") {
      return (
        <div className="space-y-1 text-center">
          <p className="font-bold text-2xl text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </p>
          <p className="mt-1 text-muted-foreground">
            {isSignUp
              ? "Create a new account to get started"
              : "Sign in to your account to continue"}
          </p>
        </div>
      );
    }

    return undefined;
  };

  return (
    <main className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center p-4">
      {/* Logo */}
      {!isSettings && (
        <div className="mb-8 flex items-center justify-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="flex size-8 items-center justify-center rounded bg-primary">
              <span className="font-bold text-lg text-primary-foreground">
                {env.NEXT_PUBLIC_PROJECT_NAME.slice(0, 1)}
              </span>
            </div>
            <p className="font-semibold text-3xl text-white">
              {env.NEXT_PUBLIC_HOSTNAME}
            </p>
          </Link>
        </div>
      )}

      <AuthCard
        pathname={pathname}
        cardHeader={cardHeader()}
        className={cn(!isSettings && "w-full max-w-md")}
      />
    </main>
  );
}
