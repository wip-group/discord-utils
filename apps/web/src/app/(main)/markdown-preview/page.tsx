import type { Metadata } from "next";
import { MarkdownPreview } from "./markdown-preview";

export const metadata: Metadata = {
  title: "Discord Markdown Preview - Discord Utils",
  description:
    "Preview Discord markdown formatting in real-time. Test bold, italic, strikethrough, code blocks, and more.",
  keywords: [
    "discord",
    "markdown",
    "preview",
    "formatting",
    "text",
    "code blocks",
  ],
};

export default function MarkdownPreviewPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Discord Markdown Preview</h1>
        <p className="text-muted-foreground">
          Preview how your text will look in Discord with markdown formatting.
          Type in the editor to see the live preview.
        </p>
      </div>
      <MarkdownPreview />
    </div>
  );
}
