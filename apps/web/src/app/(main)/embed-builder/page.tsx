import type { Metadata } from "next";
import { EmbedBuilder } from "./embed-builder";

export const metadata: Metadata = {
  title: "Discord Embed Builder - Discord Utils",
  description:
    "Create rich Discord embeds with live preview. Design custom embeds with titles, descriptions, fields, images, and more.",
  keywords: [
    "discord",
    "embed",
    "builder",
    "message",
    "rich embed",
    "discord bot",
  ],
};

export default function EmbedBuilderPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Discord Embed Builder</h1>
        <p className="text-muted-foreground">
          Create beautiful Discord embeds with our visual builder. Preview your
          embed in real-time and export the code.
        </p>
      </div>
      <EmbedBuilder />
    </div>
  );
}
