import { Button } from "@repo/ui/components/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function ToolNotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="text-center">
        <FileQuestion className="mx-auto mb-6 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-2 font-bold text-3xl">Tool Not Found</h1>
        <p className="mx-auto mb-8 max-w-md text-lg text-muted-foreground">
          The tool you're looking for doesn't exist or is still under
          development.
        </p>
        <Button asChild>
          <Link href="/">Browse Tools</Link>
        </Button>
      </div>
    </div>
  );
}