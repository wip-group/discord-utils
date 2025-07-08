"use client";

import { Button } from "@repo/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button variant="secondary" className="group" onClick={() => router.back()}>
      <ArrowLeft
        className="group-hover:-translate-x-0.5 ms-0 me-2 opacity-60 transition-transform"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      Go back
    </Button>
  );
};
