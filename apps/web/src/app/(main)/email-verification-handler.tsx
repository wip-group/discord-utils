"use client";

import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function EmailVerificationHandler() {
  const searchParams = useSearchParams();
  const { refetch } = authClient.useSession();

  useEffect(() => {
    const token = searchParams.get("email");
    
    if (!token) {
      return;
    }

    const verifyEmail = async () => {
      try {
        await authClient.verifyEmail({ query: { token } });
        // Refresh the session to get updated user data
        await refetch();
        // Remove the email parameter from URL and refresh the page
        const url = new URL(window.location.href);
        url.searchParams.delete("email");
        window.location.href = url.toString();
      } catch (error) {
        console.error("Email verification error:", error);
        // Remove the email parameter from URL and refresh the page even on error
        const url = new URL(window.location.href);
        url.searchParams.delete("email");
        window.location.href = url.toString();
      }
    };

    verifyEmail();
  }, [searchParams, refetch]);

  return null; // This component doesn't render anything
} 