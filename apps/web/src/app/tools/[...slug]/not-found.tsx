import { Button } from "@repo/ui/components/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function ToolNotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="text-center">
        <FileQuestion className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-2">Tool Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          The tool you're looking for doesn't exist or is still under development.
        </p>
        <Button asChild>
          <Link href="/">Browse All Tools</Link>
        </Button>
      </div>
    </div>
  );
}